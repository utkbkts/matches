interface customerData {
  customer: {
    id: number;
    title: string;
    desc: string;
    image: string;
    job: string;
  };
}

const SectionCustomer = ({ customer }: customerData) => {
  const { title, desc, image, job } = customer;

  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <img src={image} alt={job} title={job} />
        <h2 className="text-center font-normal text-2xl">{title}</h2>
        <p className="text-center text-gray-400 text-sm">{job}</p>
        <p className="text-center text-muted-foreground italic">{desc}</p>
      </div>
    </div>
  );
};

export default SectionCustomer;
