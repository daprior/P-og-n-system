import Main from "components/layouts/Main";
import ItBoard from "components/ItBoard"
import withAuthProtection from '../../components/withAuthProtection';

function ItIndex() {

  return (
    <Main className="">
      <ItBoard/>
    </Main>
  );
}

export default withAuthProtection(ItIndex);