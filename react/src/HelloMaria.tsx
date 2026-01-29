import HelloMariaSvg from "../../SVGS/Olá, Maria (1).svg?react";

type HelloMariaProps = {
  onNavigate?: (screen: string) => void;
};

export const HelloMaria = ({ onNavigate }: HelloMariaProps): JSX.Element => {
  const goDev = () => onNavigate?.("in-development");

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[430px] sm:max-w-[480px] min-h-screen relative">
        <div className="relative">
          <HelloMariaSvg className="w-full h-auto" />
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#f7fafd] pointer-events-none" />
          <button
            className="absolute left-[4.07%] top-[12.29%] h-[11.30%] w-[91.81%]"
            type="button"
            aria-label="Apoio Psicológico"
            onClick={goDev}
          />
          <button
            className="absolute left-[7.63%] top-[23.95%] h-[3.40%] w-[84.70%]"
            type="button"
            aria-label="Agendar consulta apoio psicológico"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[30.21%] h-[10.40%] w-[44.53%]"
            type="button"
            aria-label="Mentorias"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[40.70%] h-[4.00%] w-[44.53%]"
            type="button"
            aria-label="Agendar mentoria"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[30.21%] h-[10.40%] w-[44.25%]"
            type="button"
            aria-label="Videoteca"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[40.70%] h-[4.00%] w-[44.25%]"
            type="button"
            aria-label="Abrir videoteca"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[46.70%] h-[10.40%] w-[44.53%]"
            type="button"
            aria-label="Eventos Online"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[57.20%] h-[4.00%] w-[44.53%]"
            type="button"
            aria-label="Ver eventos"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[46.70%] h-[10.40%] w-[44.25%]"
            type="button"
            aria-label="Comunidade"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[57.20%] h-[4.00%] w-[44.25%]"
            type="button"
            aria-label="Abrir comunidade"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[63.23%] h-[7.10%] w-[91.81%]"
            type="button"
            aria-label="Rede de apoio ao imigrante"
            onClick={goDev}
          />
          <button
            className="absolute left-[7.63%] top-[70.95%] h-[2.60%] w-[84.70%]"
            type="button"
            aria-label="Acessar rede de apoio"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[75.60%] h-[4.00%] w-[91.81%]"
            type="button"
            aria-label="Blog e conteúdos"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[80.20%] h-[1.80%] w-[91.81%]"
            type="button"
            aria-label="Abrir blog e conteúdos"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[82.90%] h-[4.00%] w-[91.81%]"
            type="button"
            aria-label="Testes de Saúde Mental"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[87.50%] h-[1.80%] w-[91.81%]"
            type="button"
            aria-label="Abrir testes de saúde mental"
            onClick={goDev}
          />
        </div>
      </div>
    </div>
  );
};
