import ProfileSvg from "../../SVGS/Profile.svg?react";
import { BottomNav } from "./BottomNav";

type ProfileScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const ProfileScreen = ({
  onSelectTab,
  onNavigate,
}: ProfileScreenProps): JSX.Element => {
  const goDev = () => onNavigate?.("in-development");
  const hitAreas = [
    {
      label: "Perfil (cartão)",
      left: "4.07%",
      top: "12.10%",
      width: "91.81%",
      height: "14.00%",
    },
    {
      label: "Editar perfil",
      left: "60.00%",
      top: "22.60%",
      width: "28.00%",
      height: "4.00%",
    },
    {
      label: "Meus agendamentos",
      left: "4.07%",
      top: "32.50%",
      width: "91.81%",
      height: "7.00%",
    },
    {
      label: "Minha assinatura",
      left: "4.07%",
      top: "41.00%",
      width: "91.81%",
      height: "7.00%",
    },
    {
      label: "Configurações da conta",
      left: "4.07%",
      top: "49.50%",
      width: "91.81%",
      height: "7.00%",
    },
    {
      label: "Métodos de pagamento",
      left: "4.07%",
      top: "58.00%",
      width: "91.81%",
      height: "7.00%",
    },
    {
      label: "Ajuda e suporte",
      left: "4.07%",
      top: "66.50%",
      width: "91.81%",
      height: "7.00%",
    },
    {
      label: "Sair",
      left: "4.07%",
      top: "75.00%",
      width: "91.81%",
      height: "7.00%",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[430px] sm:max-w-[480px] pb-24">
        <div className="relative w-full aspect-[393/851]">
          <ProfileSvg className="absolute inset-0 h-full w-full" />
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
      <BottomNav active="profile" onSelect={onSelectTab} />
    </div>
  );
};
