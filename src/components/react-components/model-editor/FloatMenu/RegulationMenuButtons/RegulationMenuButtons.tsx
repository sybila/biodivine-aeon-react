import FloatMenuButton from '../FloatMenuButton/FloatMenuButton';
import { LiveModel } from '../../../../../services/global/LiveModel/LiveModel';
import type { RegulationMenuButtonsProps } from './RegulationMenuButtonsProps';
import useRegulationsStore from '../../../../../stores/LiveModel/useRegulationsStore';

import VisibilityOnIcon from '../../../../../assets/icons/visibility_on.svg';
import VisibilityOffIcon from '../../../../../assets/icons/visibility_off.svg';
import MonotocityOffIcon from '../../../../../assets/icons/swap_vert.svg';
import MonotocityActIcon from '../../../../../assets/icons/trending_up.svg';
import MonotocityInhIcon from '../../../../../assets/icons/trending_down.svg';
import DeleteIcon from '../../../../../assets/icons/delete-24px.svg';
import { useMemo } from 'react';
import type { EdgeMonotonicity } from '../../../../../types';

type MOButtonInfo = {
  icon: string;
  alt: string;
  hint: string;
  nextHintText: string;
} | null;

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

  const getObservabilityButtonInfo = (observable: boolean) => {
    return !observable
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
        };
  };

  const getMonotocityButtonInfo = (monotocity: EdgeMonotonicity) => {
    switch (monotocity) {
      case 'unspecified':
        return {
          icon: MonotocityActIcon,
          alt: 'M Act',
          hint: 'Make activating (M)',
          nextHintText: 'Make inhibiting (M)',
        };
      case 'activation':
        return {
          icon: MonotocityInhIcon,
          alt: 'M Inh',
          hint: 'Make inhibiting (M)',
          nextHintText: 'Monocity off (M)',
        };
      default:
        return {
          icon: MonotocityOffIcon,
          alt: 'M Off',
          hint: 'Monocity off (M)',
          nextHintText: 'Make activating (M)',
        };
    }
  };

  const [observabilityInfo, monotocityInfo]: [MOButtonInfo, MOButtonInfo] =
    useMemo(() => {
      if (!regulationInfo) return [null, null];

      return [
        getObservabilityButtonInfo(regulationInfo.observable),
        getMonotocityButtonInfo(regulationInfo.monotonicity),
      ];
    }, [regulationInfo]);

  if (!regulationInfo || observabilityInfo === null || monotocityInfo === null)
    return <span className="h-[36px] w-fit">Error: Regulation not found</span>;

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
        iconSrc={monotocityInfo.icon}
        iconAlt={monotocityInfo.alt}
        onClick={() =>
          LiveModel.Regulations.toggleMonotonicity(
            regulationInfo.regulator,
            regulationInfo.target
          )
        }
        hintText={monotocityInfo.hint}
        nextHintText={monotocityInfo.nextHintText}
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
