import { useHistory } from "react-router-dom";

export const Item = () => {
    let history = useHistory();
    return (
        <>
          <button onClick={() => history.goBack()}>Back</button>
        </>
    );
};
