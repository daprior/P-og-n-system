import Main from "components/layouts/Main";
import Offboard from "components/Offboard"
import withAuthProtection from '../../components/withAuthProtection';

function OffboardingIndex() {

  return (
    <Main className="">
      <Offboard/>
    </Main>
  );
}

export default withAuthProtection(OffboardingIndex);