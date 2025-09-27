import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

import ArrowUpIcon from '../../../../../assets/icons/arrow_up.svg';
import ArrowDownIcon from '../../../../../assets/icons/arrow_down.svg';
import type {
  PertTableSort,
  PerturbationSortFields,
  SortDirection,
} from '../../../../../types';

const SortButtonSection: React.FC<{
  sortDirection: SortDirection;
  sortField: PerturbationSortFields;
  setFunction: (value: PertTableSort | undefined) => void;
  disable: boolean;
}> = ({ sortDirection, sortField, setFunction, disable }) => {
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setFunction({ field: sortField, direction: newDirection });
  };

  const toggleSortField = () => {
    let newField: PerturbationSortFields = 'id';

    switch (sortField) {
      case 'id':
        newField = 'size';
        break;
      case 'size':
        newField = 'interpretations';
        break;
      default:
        newField = 'id';
        break;
    }

    setFunction({ field: newField, direction: sortDirection });
  };

  return (
    <section className="flex flex-row gap-8 h-[40px] w-full items-center justify-center">
      <IconButtonReact
        compHeight="35px"
        compWidth="35px"
        iconSize="20px"
        iconSrc={sortDirection === 'asc' ? ArrowUpIcon : ArrowDownIcon}
        iconAlt={sortDirection === 'asc' ? 'Asc' : 'Desc'}
        handleClick={() => toggleSortDirection()}
        buttonColor={disable ? 'var(--color-grey-light)' : undefined}
      />
      <TextButtonReact
        compHeight="40px"
        compWidth="300px"
        text={sortField}
        handleClick={() => toggleSortField()}
        buttonColor={disable ? 'var(--color-grey-light)' : undefined}
      />
    </section>
  );
};

export default SortButtonSection;
