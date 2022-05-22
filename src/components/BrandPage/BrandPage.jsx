const BrandPage = ({ children }) => {
  return (
    <div className="h-screen flex justify-center">
      <div className="hidden bg-gradient-to-tr from-primary-300 to-primary-50 md:w-1/2 md:flex md:justify-around md:items-center">
        <h1 className="text-white text-5xl italic">
          <span className="text-7xl text-primary-500 font-bold">Go</span>Scrum
        </h1>
      </div>
      {children}
    </div>
  );
};

export default BrandPage;
