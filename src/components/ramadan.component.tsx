const Ramadan = ({ day }: any) => {
  const classes = ["progress-bar"];
  const wd = (day *100 ) / 30

  if (day > 18) {
    classes.push("bg-success");
  } else {
    classes.push("bg-warning");
  }

  return (
    <div 
      className="progress" 
      style={{ height: "5px" }}  
    >
      <div
        className={classes.join(" ")}
        role="progressbar"
        style={{ width: wd + "%" }}
        aria-valuenow={wd}
        aria-valuemin={0}
        aria-valuemax={30}
        title={`Ramazanın gedişatı, gün ${day}`} 
      >
      </div>
    </div>
  );
};

export default Ramadan;
