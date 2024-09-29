interface CardProps {
  imgUrl: string;
  name: string;
}

// via-[#525252]via-[#262626]

//<article> would be more semantic than a div here

/*this is an advanced concept and not at ALL something you needed to do, but thought you might find it cool, in tailwind
  we can add colours to our theme that we can then use in our classes. So, i added a grey-100 to the tailwind config, now
  you can use that colour instead of doing stuff like to-[someHashCode] or bg-[someHashCode] and so now if we want to change that
  colour, we have one single source of truth that we can change and BAM it changes everywhere^^
  you can do this with other classes too if you want, not just colours D:
*/
const Card = ({ imgUrl, name }: CardProps) => {
  return (
      <div
          className="block
        bg-gradient-radial-e-to-c from-white via-medium-grey to-grey-100
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
