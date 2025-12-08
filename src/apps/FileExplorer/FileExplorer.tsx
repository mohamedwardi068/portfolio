import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { 
  FiFolder, 
  FiFile, 
  FiFileText, 
  FiImage, 
  FiArrowLeft, 
  FiHome,
  FiChevronRight 
} from 'react-icons/fi';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: React.ElementType;
  children?: FileItem[];
  content?: string;
}

const fileSystem: FileItem[] = [
  {
    name: 'Documents',
    type: 'folder',
    icon: FiFolder,
    children: [
      { name: 'resume.pdf', type: 'file', icon: FiFileText, content: 'My professional resume' },
      { name: 'cover-letter.pdf', type: 'file', icon: FiFileText, content: 'Cover letter template' },
      { name: 'notes.txt', type: 'file', icon: FiFile, content: 'Personal notes and ideas' },
    ],
  },
  {
    name: 'Projects',
    type: 'folder',
    icon: FiFolder,
    children: [
      { name: 'e-commerce/', type: 'folder', icon: FiFolder, children: [] },
      { name: 'portfolio/', type: 'folder', icon: FiFolder, children: [] },
      { name: 'README.md', type: 'file', icon: FiFileText, content: 'Project documentation' },
    ],
  },
  {
    name: 'Certificates',
    type: 'folder',
    icon: FiFolder,
    children: [
      { name: 'aws-certified.pdf', type: 'file', icon: FiFileText, content: 'AWS Solutions Architect' },
      { name: 'react-mastery.pdf', type: 'file', icon: FiFileText, content: 'React Advanced Certification' },
      { name: 'typescript.pdf', type: 'file', icon: FiFileText, content: 'TypeScript Professional' },
    ],
  },
  {
    name: 'Pictures',
    type: 'folder',
    icon: FiFolder,
    children: [
      { name: 'profile.png', type: 'file', icon: FiImage, content: 'Profile picture' },
      { name: 'screenshots/', type: 'folder', icon: FiFolder, children: [] },
    ],
  },
  { name: 'README.md', type: 'file', icon: FiFileText, content: 'Welcome to my portfolio!' },
  { name: '.bashrc', type: 'file', icon: FiFile, content: 'Shell configuration' },
];

const FileExplorer = () => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = themes[theme];
  
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(fileSystem);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [pathHistory, setPathHistory] = useState<{ path: string[]; items: FileItem[] }[]>([]);

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === 'folder' && folder.children) {
      setPathHistory([...pathHistory, { path: currentPath, items: currentItems }]);
      setCurrentPath([...currentPath, folder.name]);
      setCurrentItems(folder.children);
      setSelectedFile(null);
    }
  };

  const goBack = () => {
    if (pathHistory.length > 0) {
      const previous = pathHistory[pathHistory.length - 1];
      setCurrentPath(previous.path);
      setCurrentItems(previous.items);
      setPathHistory(pathHistory.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const goHome = () => {
    setCurrentPath(['Home']);
    setCurrentItems(fileSystem);
    setPathHistory([]);
    setSelectedFile(null);
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateToFolder(item);
    } else {
      setSelectedFile(item);
    }
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ color: currentTheme.textPrimary }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ borderColor: `${currentTheme.textSecondary}20` }}
      >
        <button
          onClick={goBack}
          disabled={pathHistory.length === 0}
          className="p-2 rounded-lg transition-colors disabled:opacity-30"
          style={{ backgroundColor: `${currentTheme.accent}15` }}
        >
          <FiArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goHome}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: `${currentTheme.accent}15` }}
        >
          <FiHome className="w-4 h-4" />
        </button>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 ml-4 text-sm">
          {currentPath.map((segment, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <FiChevronRight className="w-4 h-4 mx-1 opacity-50" />}
              <span className={index === currentPath.length - 1 ? 'font-medium' : 'opacity-70'}>
                {segment}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* File List */}
        <div className="flex-1 p-4 overflow-auto">
          {currentItems.length === 0 ? (
            <p className="text-center opacity-50 mt-8">This folder is empty</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {currentItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                    selectedFile?.name === item.name ? 'ring-2 ring-orange-500' : ''
                  }`}
                  style={{
                    backgroundColor: selectedFile?.name === item.name
                      ? `${currentTheme.accent}30`
                      : `${currentTheme.accent}10`,
                  }}
                >
                  <item.icon
                    className="w-10 h-10 mb-2"
                    style={{
                      color: item.type === 'folder' ? currentTheme.accent : currentTheme.textSecondary,
                    }}
                  />
                  <span className="text-xs text-center break-all">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Preview Panel */}
        {selectedFile && (
          <div
            className="w-64 p-4 border-l overflow-auto"
            style={{ borderColor: `${currentTheme.textSecondary}20` }}
          >
            <div className="text-center mb-4">
              <selectedFile.icon
                className="w-16 h-16 mx-auto mb-2"
                style={{ color: currentTheme.accent }}
              />
              <h3 className="font-medium">{selectedFile.name}</h3>
            </div>
            <div className="text-sm opacity-70">
              <p className="mb-2">Type: {selectedFile.type === 'folder' ? 'Folder' : 'File'}</p>
              {selectedFile.content && (
                <p className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${currentTheme.accent}15` }}>
                  {selectedFile.content}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
