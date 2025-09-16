import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

const NoDataText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <section className="flex h-[200px] w-full justify-center items-center flex-col text-center">
      <SimpleHeaderReact
        className="ml-[24px]"
        headerText={text}
        textFontWeight="normal"
      />
    </section>
  );
};

export default NoDataText;
