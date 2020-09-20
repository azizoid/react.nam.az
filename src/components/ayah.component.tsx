import React, { useState, useEffect } from "react";

import { MdFormatQuote } from "react-icons/md";

const Ayah = () => {
  const [ayah, setAyah] = useState({
    content: {
      s: 40,
      a: 60,
      c:
        "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'.",
    },
  });

  useEffect(() => {
    fetch("https://quran.az/api/random/1/Namaz")
      .then((response) => response.json())
      .then((data) => {
        setAyah({ content: data.out[0] });
      });
  }, []);

  return (
    <blockquote className="ayah">
      <MdFormatQuote style={{ color: "#66cc66" }} />
      <cite>
        {ayah.content.s} : {ayah.content.a}
      </cite>
      {ayah.content.c}
      <a
        href={`https://quran.az/${ayah.content.s}#${ayah.content.a}?rel=namaz`}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <br />
        <small>Surəni Tam Oxu</small>
      </a>
    </blockquote>
  );
};

export default Ayah;
