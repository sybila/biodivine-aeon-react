import config from '../../../../../config';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import WindowsIcon from '../../../../../assets/icons/windows.svg';
import LinuxIcon from '../../../../../assets/icons/linux.svg';
import MacIcon from '../../../../../assets/icons/macos.svg';

const DownloadComputeEngine: React.FC = () => {
  const buttons: Array<{ text: string; link: string; iconSrc: string }> = [
    {
      text: 'Windows x64',
      link: config.computeEngineDownloadLinks.windows,
      iconSrc: WindowsIcon,
    },

    {
      text: 'Linux x64',
      link: config.computeEngineDownloadLinks.linux,
      iconSrc: LinuxIcon,
    },
    {
      text: 'MacOS x86',
      link: config.computeEngineDownloadLinks.macosIntel,
      iconSrc: MacIcon,
    },
    {
      text: 'MacOs Arm',
      link: config.computeEngineDownloadLinks.macosArm,
      iconSrc: MacIcon,
    },
  ];

  const openLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="h-[150px] w-[500px] flex flex-col items-center-safe overflow-y-scroll gap-3 p-1 mb-1">
      {buttons.map((button, index) => (
        <TextIconButtonReact
          key={index}
          compHeight="28px"
          compWidth="95%"
          text={button.text}
          handleClick={() => openLink(button.link)}
          iconSrc={button.iconSrc}
        />
      ))}
    </section>
  );
};

export default DownloadComputeEngine;
