import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const useJikanAired = (aired) => {
  const [jikanAired, setJikanAired] = useState("");

  useEffect(() => {
    if (aired) {
      let from = "";
      if (aired.from)
        from = `Transmitido del ${format(
          new Date(aired.from),
          "dd  MMMM  yyyy",
          {
            locale: es,
          }
        )}`;
      let to = " hasta la actualidad.";
      if (aired.to)
        to = ` al ${format(new Date(aired.to), "dd  MMMM  yyyy", {
          locale: es,
        })}`;
      setJikanAired(from + to);
    }
  }, [aired]);

  return jikanAired;
};

export default useJikanAired;