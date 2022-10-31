const FormForFiveDay = ({ foreCastCity, setForeCastCity, foreCastSubmitHandler }) => {

  return (
    <form 
        className="second_Form"
        onSubmit={foreCastSubmitHandler}>
        <input
        type="text"
        placeholder="Enter your city..."
          onChange={(event) => {
            setForeCastCity(event.target.value)
          }}
          value={foreCastCity}
          />
      {/* <button>
        5 Day Weather Forecast
      </button> */}
    </form>
  );
};

export default FormForFiveDay;