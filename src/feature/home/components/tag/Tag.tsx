type TagProps = {
  category: string;
};

const Tag = ({ category }: TagProps) => {
  return (
    <div className="border-main w-40 rounded-lg rounded-l-none border border-l-0 p-2 text-center">
      {category}
    </div>
  );
};

export default Tag;
