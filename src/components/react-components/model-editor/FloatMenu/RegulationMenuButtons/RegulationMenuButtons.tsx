import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';
import { LiveModel } from '../../../../../services/global/LiveModel/LiveModel';
import type { RegulationMenuButtonsProps } from './RegulationMenuButtonsProps';
import useRegulationsStore from '../../../../../stores/LiveModel/useRegulationsStore';

import VisibilityOnIcon from '../../../../../assets/icons/visibility_on.svg';
import VisibilityOffIcon from '../../../../../assets/icons/visibility_off.svg';
import MonocityOffIcon from '../../../../../assets/icons/swap_vert.svg';
import MonocityActIcon from '../../../../../assets/icons/trending_up.svg';
import MonocityInhIcon from '../../../../../assets/icons/trending_down.svg';
import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import { useMemo } from 'react';

const RegulationMenuButtons: React.FC<RegulationMenuButtonsProps> = ({
  setHint,
  selectedRegulationIds,
}) => {
  const regulationInfo = useRegulationsStore((state) =>
    state.getRegulationId(
      selectedRegulationIds.regulator,
      selectedRegulationIds.target
    )
  );

  if (!regulationInfo)
    return <span className="h-[36px] w-fit">Error: Regulation not found</span>;

  const observabilityInfo: {
    icon: string;
    alt: string;
    hint: string;
    nextHintText: string;
  } = useMemo(
    () =>
      !regulationInfo.observable
        ? {
            icon: VisibilityOnIcon,
            alt: 'O On',
            hint: 'Observability on (O)',
            nextHintText: 'Observability off (O)',
          }
        : {
            icon: VisibilityOffIcon,
            alt: 'O Off',
            hint: 'Observability off (O)',
            nextHintText: 'Observability on (O)',
          },
    [regulationInfo]
  );

  const monocityInfo: {
    icon: string;
    alt: string;
    hint: string;
    nextHintText: string;
  } = useMemo(() => {
    switch (regulationInfo.monotonicity) {
      case 'unspecified':
        return {
          icon: MonocityActIcon,
          alt: 'M Act',
          hint: 'Make activating (M)',
          nextHintText: 'Make inhibiting (M)',
        };
      case 'activation':
        return {
          icon: MonocityInhIcon,
          alt: 'M Inh',
          hint: 'Make inhibiting (M)',
          nextHintText: 'Monocity off (M)',
        };
      default:
        return {
          icon: MonocityOffIcon,
          alt: 'M Off',
          hint: 'Monocity off (M)',
          nextHintText: 'Make activating (M)',
        };
    }
  }, [regulationInfo]);

  return (
    <div className="flex flex-row h-auto w-[99%] items-center">
      <FloatMenuButton
        iconSrc={observabilityInfo.icon}
        iconAlt={observabilityInfo.alt}
        onClick={() =>
          LiveModel.Regulations.toggleObservability(
            regulationInfo.regulator,
            regulationInfo.target
          )
        }
        hintText={observabilityInfo.hint}
        nextHintText={observabilityInfo.nextHintText}
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={monocityInfo.icon}
        iconAlt={monocityInfo.alt}
        onClick={() =>
          LiveModel.Regulations.toggleMonotonicity(
            regulationInfo.regulator,
            regulationInfo.target
          )
        }
        hintText={monocityInfo.hint}
        nextHintText={monocityInfo.nextHintText}
        setHintText={setHint}
      />
      <FloatMenuButton
        iconSrc={DeleteIcon}
        iconAlt="⌫"
        onClick={() =>
          LiveModel.Regulations.removeRegulation(
            regulationInfo.regulator,
            regulationInfo.target
          )
        }
        hintText="Remove (⌫)"
        setHintText={setHint}
      />
    </div>
  );
};

export default RegulationMenuButtons;
