import React, { useState, useEffect, useRef } from "react";

import NavBar from "./components/navbar.component";

import Location from "./components/location.component";
import Progress from "./components/progress.component";
import PrayerList from "./components/prayerlist.component";
import PrayerListStill from "./components/prayerliststill.component";
import Ayah from "./components/ayah.component";

import Footer from "./components/footer.component";

import {
  format,
  formatDistanceStrict,
  parse,
  differenceInSeconds,
  getDayOfYear,
} from "date-fns";

import az from "date-fns/locale/az";

import cities from "./assist/cities";

const App = () => {
  const newDate = useRef(new Date());

  const [prayers, setPrayers] = useState([
    { id: 1, title: "Fəcr namazı", time: "--:--", rakat: 2 },
    { id: 2, title: "Günəş", time: "-:-", rakat: 0 },
    { id: 3, title: "Zöhr namazı", time: "-:-", rakat: 4 },
    { id: 4, title: "Əsr namazı", time: "-:-", rakat: 4 },
    { id: 5, title: "Məğrib namazı", time: "-:-", rakat: 3 },
    { id: 6, title: "İşa namazı", time: "-:-", rakat: 4 },
  ]);

  const [pref, setPref] = useState({
    location: "Bakı",
    currentPrayer: -1,
    nowis: format(newDate.current, "HH:mm"),
    tarix: format(newDate.current, "EEEE, d MMMM yyyy", { locale: az }),
    hijri: "",
    today: getDayOfYear(newDate.current),
    progress: 0,
  });

  const [city, setCity] = useState(
    JSON.parse(localStorage.getItem("city") as string) || 1
  );
  const [dd, setDd] = useState(pref.today);

  useEffect(() => {
    let url = "https://nam.az/api/" + city + "/" + dd;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let currentPrayer = 5;

        const tmpPrayers = prayers.map((prayer: any, i) => {
          prayer["time"] = data.prayers[i];
          prayer["ago"] = formatDistanceStrict(
            newDate.current,
            parse(data.prayers[i], "HH:mm", newDate.current),
            { locale: az, addSuffix: true }
          );
          if (data.prayers[i] < pref.nowis) {
            currentPrayer = i;
          }
          return prayer;
        });

        let progress = 0;
        if (pref.today !== data.dd) {
          currentPrayer = -1;
        } else {
          progress = per(currentPrayer, data.prayers, pref.nowis);
        }

        setPrayers([...tmpPrayers]);

        setPref((prev) => {
          return {
            ...prev,
            progress: progress,
            currentPrayer: currentPrayer,
            location: cities[city],
            tarix: data.tarix,
            hijri: data.hijri,
          };
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, dd]);

  const per = (curr: number, prayers: any, nowis: string): number => {
    const untillNow = differenceInSeconds(
      parse(nowis, "HH:mm", newDate.current),
      parse(prayers[curr], "HH:mm", newDate.current)
    );

    let untillNext;
    if (curr === 5) {
      untillNext = differenceInSeconds(
        parse("23:59", "HH:mm", newDate.current),
        parse(prayers[curr], "HH:mm", newDate.current)
      );
    } else {
      untillNext = differenceInSeconds(
        parse(prayers[curr++], "HH:mm", newDate.current),
        parse(prayers[curr], "HH:mm", newDate.current)
      );
    }

    return Math.abs(Math.floor((untillNow * 100) / untillNext));
  };

  const changeCity = (v: number): void => {
    if (!(v in cities)) return;

    if (v !== 0) {
      localStorage.setItem("city", JSON.stringify(v));
      setPref((prev) => ({ ...prev, location: cities[v] }));
      setCity(v);
    }
  };

  return (
    <div>
      <NavBar changeCity={changeCity} city={city} />

      <div className="container">
        <Location
          location={pref.location}
          tarix={pref.tarix}
          hijri={pref.hijri}
          dd={dd}
          changeDd={(v: number) => setDd(v)}
        />
        <Progress bar={pref.progress} />

        {pref.today === dd ? (
          <PrayerList prayers={prayers} currentPrayer={pref.currentPrayer} />
        ) : (
          <PrayerListStill prayers={prayers} />
        )}

        <Ayah />
      </div>

      <Footer />
    </div>
  );
};

export default App;
