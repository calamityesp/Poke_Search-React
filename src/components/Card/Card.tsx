interface CardProps {
  imgUrl: string;
  name: string;
}

// via-[#525252]via-[#262626]
const Card = ({ imgUrl, name }: CardProps) => {
  return (
      <div
          className="block
        bg-gradient-radial-e-to-c from-white via-medium-grey to-[#242424] 
        rounded-[50px]
        w-72"
      >
        <div id="card-img" className="flex justify-center ">
          <img className="rounded-t-lg" src={imgUrl} alt=""/>
        </div>
        <div className="p-6 text-surface dark:text-white">
          <h5 className="mb-2 text-xl font-medium leading-tight">{name}</h5>
          <p className="mt-4 text-center">-- Add Description Here --</p>
        </div>

        {/*label has no value so it doesn't really serve any purpose being sent to the browser and rendered empty*/}
        <label htmlFor="PokeSearch"></label>
      </div>
  );
};

export default Card;
