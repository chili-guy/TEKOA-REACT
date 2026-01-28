import headerShape from "./header-shape.png";

type EssentialDetailsProps = {
  onBack?: () => void;
  onSuccess?: () => void;
};

export const EssentialDetails = ({
  onBack,
  onSuccess,
}: EssentialDetailsProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="relative w-full max-w-[393px] flex flex-col min-h-screen bg-white overflow-hidden">
        <header className="relative h-[200px] overflow-hidden rounded-b-[32px] px-5 pt-8 pb-8 text-white bg-[linear-gradient(180deg,#5b97e7_0%,#5394de_40%,#4d8cd2_70%,#4c8bcf_100%)]">
          <img
            src={headerShape}
            alt=""
            className="absolute right-0 top-0 h-full w-[55%] object-cover opacity-25"
          />
          <button
            className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur"
            type="button"
            aria-label="Voltar"
            onClick={onBack}
          >
            ←
          </button>
          <div className="relative z-10 mt-6 text-center">
            <h1 className="text-2xl font-semibold">Crie sua conta</h1>
            <p className="mt-2 text-sm text-white/90">
              Vamos começar com algumas informações essenciais.
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 -mt-6">
          <div className="rounded-[28px] bg-white px-4 pt-8 pb-6 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4">
            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                Nome completo
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                placeholder="Digite seu nome completo"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                E-mail
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                placeholder="seuemail@exemplo.com"
                type="email"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                Telefone / WhatsApp
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                País onde reside
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                placeholder="Digite o país"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                Documento (Passaporte)
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                placeholder="Apenas o número"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                Idade
              </span>
              <div className="relative w-full">
                <select className="w-full appearance-none rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 p-4 border border-gray-200 text-base font-normal leading-normal">
                  <option value="">Selecione sua idade</option>
                  <option>18-24</option>
                  <option>25-34</option>
                  <option>35-44</option>
                  <option>45-54</option>
                  <option>55+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#333D5F]">
                  <span className="text-xl">▾</span>
                </div>
              </div>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                Gênero (Opcional)
              </span>
              <div className="relative w-full">
                <select className="w-full appearance-none rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 p-4 border border-gray-200 text-base font-normal leading-normal">
                  <option value="">Selecione seu gênero</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                  <option>Prefiro não dizer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#333D5F]">
                  <span className="text-xl">▾</span>
                </div>
              </div>
            </label>
          </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="mx-auto w-full max-w-[393px] px-4 py-4">
            <button
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-[#2c74e8] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em]"
              onClick={onSuccess}
              type="button"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

