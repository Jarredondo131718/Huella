import moment from "moment";
export default function() {
//   console.log("moment tody ", moment().format("MMMM Do YYYY, h:mm:ss a"));
  //moment('2018-08-11').isSameOrBefore('2018-08-12'); true
  //moment().subtract(self.moment().hours(), "hours")
  //moment().add(Number, String) String= Y,M,D, H(Horas)
  // Objet: FMenor,FMayor,UT:Unidat Tiempo= y(Años),M(Meses),d(dias),h(horas),m(minutos),s(Segundos), ms(milisegundos),w(semanas),Q(trimestre)
  const ValidarFechas = (PObjet) => {
    // console.log("PObjet 1", PObjet, " su nega ", !PObjet);
    try {
      if (
        !(
          PObjet.UT == "y" ||
          PObjet.UT == "M" ||
          PObjet.UT == "d" ||
          PObjet.UT == "h" ||
          PObjet.UT == "m" ||
          PObjet.UT == "s" ||
          PObjet.UT == "ms" ||
          PObjet.UT == "w" ||
          PObjet.UT == "Q"
        )
      )
        PObjet.UT = "d";

      if (!PObjet.UT) PObjet.UT = 0;
      PObjet.FMayor = moment(PObjet.FMayor);
      PObjet.FMenor = moment(PObjet.FMenor);
      let mDiferencia = PObjet.FMayor.diff(PObjet.FMenor, PObjet.UT,true);
      console.log("PObjet ", PObjet, " mDiferencia ", mDiferencia,
      ' formatMa ', PObjet.FMayor.format("YYYY/MM/DD"),
      ' formatMe', PObjet.FMenor.format("YYYY/MM/DD"),' oper ', PObjet.Operador);
      switch (PObjet.Operador) {
        case "EQ":
          return (mDiferencia == PObjet.Tiempo);
        case "MY":
          return (mDiferencia > PObjet.Tiempo);
        case "MAE":
          return (mDiferencia >= PObjet.Tiempo);
        default:
          break;
      }

    } catch (error) {
      console.log("por error ", error);
      return false;
    }
    return true; //mDiferencia>=PObjet.Tiempo
  };
  return { ValidarFechas };
}
