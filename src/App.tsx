import React, { useState, useEffect } from "react";

import NavBar from "./components/navbar.component";

import Location from "./components/location.component";
import Progress from "./components/progress.component";
import PrayerList from "./components/prayerlist.component";
import PrayerListStill from "./components/prayerliststill.component";
import Ayah from "./components/ayah.component";

import {
  format,
  formatDistanceStrict,
  parse,
  differenceInSeconds,
  getDayOfYear,
} from "date-fns";
import { az } from "date-fns/locale";

import { cities } from "./assist/cities";

const App = () => {
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
    nowis: format(new Date(), "HH:mm"),
    tarix: format(new Date(), "EEEE, d MMMM yyyy", { locale: az }),
    hijri: "",
    today: getDayOfYear(new Date()),
    prayerLoader: 1,
    progress: 0,
  });

  const [city, setCity] = useState(
    JSON.parse(localStorage.getItem("city") as string) || 1
  );
  const [dd, setDd] = useState(pref.today);

  useEffect(() => {
    let tmpCity = JSON.parse(localStorage.getItem("city") as string) || 1;
    if (tmpCity) {
      setCity(tmpCity);
    }
  }, []);

  useEffect(() => {
    let url = "https://nam.az/api/" + city + "/" + dd;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let currentPrayer = 5;
        const newDate = new Date();

        const tmpPrayers = prayers.map((prayer: any, i) => {
          prayer["time"] = data.prayers[i];
          prayer["ago"] = formatDistanceStrict(
            newDate,
            parse(data.prayers[i], "HH:mm", newDate),
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
            prayerLoader: 0,
            ramadan: data.dd - 114,
          };
        });
        // console.log("City: " + city + ". Doy: " + dd);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, dd]);

  const per = (curr: number, prayers: any, nowis: string) => {
    const tmpDate = new Date();
    const untillNow = differenceInSeconds(
      parse(nowis, "HH:mm", tmpDate),
      parse(prayers[curr], "HH:mm", tmpDate)
    );

    // const next = curr === 5 ? 0 : curr + 1;
    let untillNext;
    if (curr === 5) {
      untillNext = differenceInSeconds(
        parse("23:59", "HH:mm", tmpDate),
        parse(prayers[curr], "HH:mm", tmpDate)
      );
    } else {
      untillNext = differenceInSeconds(
        parse(prayers[curr++], "HH:mm", tmpDate),
        parse(prayers[curr], "HH:mm", tmpDate)
      );
    }

    return Math.abs(Math.floor((untillNow * 100) / untillNext));
  };

  const changeCity = (v: number) => {
    if (!(v in cities)) v = 0;

    if (v !== 0) {
      localStorage.setItem("city", JSON.stringify(v));

      setPref((prev) => {
        return { ...prev, location: cities[v] };
      });
      setCity(v);
    }
  };

  const changeDd = (v: number) => {
    setPref((prev) => {
      return { ...prev, tarix: prev.tarix };
    });
    setDd(v);
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
          changeDd={changeDd}
        />
        <Progress bar={pref.progress} />

        {pref.today === dd ? (
          <PrayerList prayers={prayers} currentPrayer={pref.currentPrayer} />
        ) : (
          <PrayerListStill prayers={prayers} />
        )}

        {/* {true || pref.currentPrayer === 3 ? (
          <Dua time={pref.currentPrayer} />
        ) : (
          <Ayah />
        )} */}
        {/* <Dua time={pref.currentPrayer} /> */}
        <Ayah />
      </div>

      <footer className="footer">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">&copy; 2020</li>
            <li className="breadcrumb-item">
              <a href="https://www.nam.az">Nam.az</a>
            </li>
            <li className="breadcrumb-item">
              <a href="https://www.quran.az">Quran.az</a>
            </li>
            {/* <li className="breadcrumb-item align-right">
              <small>
                Namaz Vaxtları: <u>islamicfinder.com</u>
              </small>
            </li> */}
          </ol>
        </nav>
      </footer>
    </div>
  );
};

export default App;
