type StepperProps = {
  currentStep: number;
  totalSteps?: number;
  circleSize?: number;
  lineHeight?: number;
  lineWidth?: number;
};

export default function Stepper({
  currentStep,
  totalSteps = 4,
  circleSize,
  lineHeight = 4,
}: StepperProps) {
  const circleStyle =
    circleSize !== undefined
      ? { width: circleSize, height: circleSize }
      : undefined;

  return (
    <ol className="flex items-center justify-center w-full max-w-3xl mx-auto px-4 overflow-x-auto">
      {[...Array(totalSteps).keys()].map((_, index) => {
        const step = index + 1;
        return (
          <li key={step} className="flex items-center flex-1 min-w-0 last:flex-none">
            <div className="flex items-center w-full">
              <div
                className={`z-10 flex items-center justify-center rounded-full shrink-0 text-xs sm:text-sm ${
                  circleSize === undefined ? 'w-8 h-8 sm:w-10 sm:h-10' : ''
                } ${
                  step <= currentStep
                    ? 'bg-[#1e4b8e] text-white'
                    : 'bg-[#EFF0F6] text-[#9A8F82]'
                }`}
                style={circleStyle}
              >
                {step}
              </div>

              {index < totalSteps - 1 && (
                <div
                  className="flex items-center mx-0.5 sm:mx-1 flex-1 min-w-[8px] max-w-[40px] sm:max-w-[50px]"
                  style={{ height: lineHeight }}
                >
                  <div
                    className={`h-full w-1/2 ${
                      step <= currentStep ? 'bg-[#1e4b8e] rounded-l-full' : 'bg-[#EFF0F6]'
                    }`}
                  />
                  <div
                    className={`h-full w-1/2 ${
                      step < currentStep ? 'bg-[#1e4b8e]' : 'bg-[#EFF0F6] rounded-r-full'
                    }`}
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
