import Main from "components/layouts/Main";
import Onboard from "components/Onboard"
import withAuthProtection from '../../components/withAuthProtection';

function OnboardIndex() {

  return (
    <Main className="">
      <Onboard/>
    </Main>
  );
}

export default withAuthProtection(OnboardIndex);