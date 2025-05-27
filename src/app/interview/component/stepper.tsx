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
  circleSize = 35,
  lineHeight = 6,
  lineWidth = 50,
}: StepperProps) {
  return (
    <ol className="flex items-center justify-center w-full max-w-3xl mx-auto px-2 sm:px-4">
      {[...Array(totalSteps).keys()].map((_, index) => {
        const step = index + 1;
        return (
          <li key={step} className="flex items-center relative justify-center">
            <div className="flex items-center justify-center w-full">
              {/* Step Circle */}
              <div
                className={`z-10 flex items-center justify-center rounded-full shrink-0 text-sm sm:text-xs ${
                  step < currentStep
                    ? 'bg-[#1e4b8e] text-white'
                    : step === currentStep
                      ? 'bg-[#1e4b8e] text-white'
                      : 'bg-[#EFF0F6] text-[#9A8F82]'
                }`}
                style={{
                  width: circleSize,
                  height: circleSize,
                }}
              >
                {step}
              </div>

              {/* Line between steps */}
              {index < totalSteps - 1 && (
                <div
                  className="flex items-center mx-1"
                  style={{
                    width: lineWidth,
                    height: lineHeight,
                  }}
                >
                  {/* Left half of line */}
                  <div
                    className={`h-full w-1/2 ${
                      step <= currentStep ? 'bg-[#1e4b8e] rounded-l-full' : 'bg-[#EFF0F6]'
                    }`}
                  ></div>

                  {/* Right half of line */}
                  <div
                    className={`h-full w-1/2 ${
                      step < currentStep ? 'bg-[#1e4b8e]' : 'bg-[#EFF0F6] rounded-r-full'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
