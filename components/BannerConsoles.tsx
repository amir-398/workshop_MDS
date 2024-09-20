interface BannerConsolesProps {
  consoleName: string;
}

const BannerConsoles = ({ consoleName }: BannerConsolesProps) => {
  return (
    <div className="bg-black text-white text-center py-10 border-t-2 border-white">
      <h1 className="text-6xl font-bold"> 
        {consoleName}
      </h1>
    </div>
  );
};

export default BannerConsoles;
