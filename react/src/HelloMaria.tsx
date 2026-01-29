import HelloMariaSvg from "../../SVGS/Olá, Maria (1).svg?react";
import { BottomNav } from "./BottomNav";

type HelloMariaProps = {
  onNavigate?: (screen: string) => void;
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const HelloMaria = ({
  onNavigate,
  onSelectTab,
}: HelloMariaProps): JSX.Element => {
  const goDev = () => onNavigate?.("in-development");
  const hitAreas = [
    {
      label: "Apoio Psicológico (título)",
      left: "4.07%",
      top: "12.29%",
      width: "91.81%",
      height: "4.20%",
    },
    {
      label: "Apoio Psicológico (subtítulo)",
      left: "4.07%",
      top: "16.70%",
      width: "91.81%",
      height: "3.30%",
    },
    {
      label: "Apoio Psicológico (preço)",
      left: "4.07%",
      top: "20.20%",
      width: "91.81%",
      height: "2.40%",
    },
    {
      label: "Apoio Psicológico (botão)",
      left: "7.63%",
      top: "23.30%",
      width: "84.70%",
      height: "4.20%",
    },
    {
      label: "Mentorias (título)",
      left: "4.07%",
      top: "30.21%",
      width: "44.53%",
      height: "3.60%",
    },
    {
      label: "Mentorias (subtítulo)",
      left: "4.07%",
      top: "34.10%",
      width: "44.53%",
      height: "2.60%",
    },
    {
      label: "Mentorias (botão)",
      left: "4.07%",
      top: "40.70%",
      width: "44.53%",
      height: "4.00%",
    },
    {
      label: "Videoteca (título)",
      left: "51.65%",
      top: "30.21%",
      width: "44.25%",
      height: "3.60%",
    },
    {
      label: "Videoteca (subtítulo)",
      left: "51.65%",
      top: "34.10%",
      width: "44.25%",
      height: "2.60%",
    },
    {
      label: "Videoteca (botão)",
      left: "51.65%",
      top: "40.70%",
      width: "44.25%",
      height: "4.00%",
    },
    {
      label: "Eventos Online (título)",
      left: "4.07%",
      top: "46.70%",
      width: "44.53%",
      height: "3.60%",
    },
    {
      label: "Eventos Online (subtítulo)",
      left: "4.07%",
      top: "50.60%",
      width: "44.53%",
      height: "2.60%",
    },
    {
      label: "Eventos Online (botão)",
      left: "4.07%",
      top: "57.20%",
      width: "44.53%",
      height: "4.00%",
    },
    {
      label: "Comunidade (título)",
      left: "51.65%",
      top: "46.70%",
      width: "44.25%",
      height: "3.60%",
    },
    {
      label: "Comunidade (subtítulo)",
      left: "51.65%",
      top: "50.60%",
      width: "44.25%",
      height: "2.60%",
    },
    {
      label: "Comunidade (botão)",
      left: "51.65%",
      top: "57.20%",
      width: "44.25%",
      height: "4.00%",
    },
    {
      label: "Rede de apoio (título)",
      left: "4.07%",
      top: "63.23%",
      width: "91.81%",
      height: "3.40%",
    },
    {
      label: "Rede de apoio (subtítulo)",
      left: "4.07%",
      top: "66.90%",
      width: "91.81%",
      height: "3.10%",
    },
    {
      label: "Rede de apoio (botão)",
      left: "7.63%",
      top: "70.95%",
      width: "84.70%",
      height: "2.60%",
    },
    {
      label: "Blog e conteúdos (título)",
      left: "4.07%",
      top: "75.60%",
      width: "91.81%",
      height: "2.40%",
    },
    {
      label: "Blog e conteúdos (subtítulo)",
      left: "4.07%",
      top: "78.10%",
      width: "91.81%",
      height: "1.80%",
    },
    {
      label: "Blog e conteúdos (botão)",
      left: "4.07%",
      top: "80.20%",
      width: "91.81%",
      height: "1.80%",
    },
    {
      label: "Testes de Saúde Mental (título)",
      left: "4.07%",
      top: "82.90%",
      width: "91.81%",
      height: "2.40%",
    },
    {
      label: "Testes de Saúde Mental (subtítulo)",
      left: "4.07%",
      top: "85.40%",
      width: "91.81%",
      height: "1.80%",
    },
    {
      label: "Testes de Saúde Mental (botão)",
      left: "4.07%",
      top: "87.50%",
      width: "91.81%",
      height: "1.80%",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[430px] sm:max-w-[480px] pb-24">
        <div className="relative w-full aspect-[393/1066]">
          <HelloMariaSvg className="absolute inset-0 h-full w-full" />
          <div className="absolute top-0 left-0 right-0 h-[4.5%] bg-[#f7fafd] pointer-events-none" />
          {hitAreas.map((area) => (
            <button
              key={area.label}
              className="absolute"
              style={{
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
              }}
              type="button"
              aria-label={area.label}
              onClick={goDev}
            />
          ))}
        </div>
      </div>
      <BottomNav active="home" onSelect={onSelectTab} />
    </div>
  );
};
