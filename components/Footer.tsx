const Footer = () => (
  <footer className="bg-gray-800 text-gray-200 py-6 mt-8">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Meal Sync. All rights reserved.</div>
      <div className="flex gap-4">
        {/* Footer icon placeholders */}
        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">[Icon]</span>
        </div>
        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">[Icon]</span>
        </div>
        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">[Icon]</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
