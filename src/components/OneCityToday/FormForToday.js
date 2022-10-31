// import TodayWeatherSubmitHandler from "./TodayWeatherSubmitHandler";

const FormForToday = ({ input, setInput, todayWeatherSubmitHandler}) => {
  return (
    <form
      className="form_First"
      onSubmit={todayWeatherSubmitHandler}
      >
      <input
        type="text"
        placeholder="Enter your city..."
          onChange={(event) => {
            setInput(event.target.value)
          }}
          value={input}
        />
    </form>
  );
};

export default FormForToday;