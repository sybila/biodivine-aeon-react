import ArrowDownIcon from '../../../../../assets/icons/arrow_down.svg';
import ArrowUpIcon from '../../../../../assets/icons/arrow_up.svg';
import type { PerturbationSortFields } from '../../../../../types/types';
import IconButtonReact from '../../../lit-wrappers/IconButtonReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { SortButtonSectionProps } from './SortButtonSectionProps';

const SortButtonSection: React.FC<SortButtonSectionProps> = ({
  sortDirection,
  sortField,
  setFunction,
  disable,

  pageStringProviderServ,
  helpHoverStore,
}) => {
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
        buttonColor={
          disable
            ? 'var(--color-secondary-buttons-disabled)'
            : 'var(--color-secondary-buttons)'
        }
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.changeSortDirection(),
              true,
              -50,
              150
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
      <TextButtonReact
        compHeight="40px"
        compWidth="300px"
        text={sortField}
        handleClick={() => toggleSortField()}
        buttonColor={
          disable
            ? 'var(--color-secondary-buttons-disabled)'
            : 'var(--color-secondary-buttons)'
        }
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.changeSortingAttribute(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </section>
  );
};

export default SortButtonSection;
