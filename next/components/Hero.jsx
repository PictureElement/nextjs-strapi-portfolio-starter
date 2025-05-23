import BtnPrimary from './BtnPrimary';
// import AnimatedGradient from './AnimatedGradient';
import ShapeDivider from './ShapeDivider';
import BtnSecondary from './BtnSecondary';

export default function Hero({ data }) {
  // Destructure the necessary properties
  const { greeting, headline, supportiveText, primaryButton, secondaryButton } = data;

  return (
    <section className="bg-primary-50 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative z-50 mx-auto max-w-5xl px-4 pt-[168px] pb-24 sm:pt-48 sm:pb-[120px] text-center">
        {greeting && (
          <p className="font-normal text-xl sm:text-2xl lg:text-3xl text-primary-700 -rotate-3 mb-4">{greeting}</p>
        )}
        <h1 className="text-gray-900 font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          {headline}
        </h1>
        <p className="text-gray-700 text-lg mt-6">{supportiveText}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryButton && (
            <BtnPrimary
              target={primaryButton.openLinkInNewTab ? "_blank" : undefined}
              rel={primaryButton.sameHostLink ? undefined : "noopener noreferrer"}
              className="w-full sm:w-auto"
              label={primaryButton.label}
              url={primaryButton.url}
              showIcon={primaryButton.showIcon}
              iconType={primaryButton.iconType}
            />
          )}
          {secondaryButton && (
            <BtnSecondary
              target={secondaryButton.openLinkInNewTab ? "_blank" : undefined}
              rel={secondaryButton.sameHostLink ? undefined : "noopener noreferrer"}
              className="w-full sm:w-auto"
              label={secondaryButton.label}
              url={secondaryButton.url}
              showIcon={secondaryButton.showIcon}
              iconType={secondaryButton.iconType}
            />
          )}
        </div>
      </div>
      {/* <AnimatedGradient /> */}
    </section>
  );
}
