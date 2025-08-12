import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

const NoSelectedNode: React.FC = () => {
  return (
    <section className="flex h-[200px] w-full justify-center items-center flex-col text-center">
      <SimpleHeaderReact
        className="ml-[24px]"
        headerText="No Node Selected"
        textFontWeight="normal"
      />
    </section>
  );
};

export default NoSelectedNode;
