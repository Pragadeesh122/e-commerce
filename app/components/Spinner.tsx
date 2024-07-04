import {PuffLoader} from "react-spinners";

function Spinner() {
  return (
    <PuffLoader
      color='#000000'
      cssOverride={{}}
      loading
      size={60}
      speedMultiplier={2}
    />
  );
}

export default Spinner;
