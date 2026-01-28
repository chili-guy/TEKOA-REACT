import illustration from "./illustration-0.png";
import googleLogo from "./google.svg";
import appleLogo from "./apple.svg";

type CreateAccountProps = {
  onContinue?: () => void;
  onLogin?: () => void;
};

export const CreateAccount = ({
  onContinue,
  onLogin,
}: CreateAccountProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] px-4 pb-10 pt-24 flex flex-col items-center">
        <div className="w-[139px] h-[178px] rounded-[20px] overflow-hidden bg-[#f7fafd]">
          <img
            src={illustration}
            alt="Ilustração de criação de conta"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-10 text-[24px] font-heading-h1 text-b-1 text-center">
          Criar conta
        </h1>
        <p className="mt-2 text-b-2 text-sm text-center max-w-[320px]">
          Comece sua jornada com apoio emocional e integração.
        </p>

        <button
          className="mt-10 w-full max-w-[361px] h-12 rounded-xl bg-main text-white text-base font-button-blod-16 shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
          type="button"
          onClick={onContinue}
        >
          Criar conta
        </button>
        <button
          className="mt-3 w-full max-w-[361px] h-12 rounded-xl border border-main text-main text-base font-button-blod-16 bg-white transition-transform active:scale-[0.98]"
          type="button"
          onClick={onLogin}
        >
          Entrar
        </button>

        <div className="mt-10 w-full max-w-[361px] flex gap-4">
          <button
            className="flex-1 h-[47px] rounded-[11.5px] border border-line text-b-1 text-sm font-label-medium-14 bg-white inline-flex items-center justify-center gap-2"
            type="button"
          >
            <img src={googleLogo} alt="" className="w-5 h-5" />
            Google
          </button>
          <button
            className="flex-1 h-[47px] rounded-[11.5px] border border-line text-b-1 text-sm font-label-medium-14 bg-white inline-flex items-center justify-center gap-2"
            type="button"
          >
            <img src={appleLogo} alt="" className="w-5 h-5" />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

