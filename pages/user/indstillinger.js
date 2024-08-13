import { Tabs, rem } from "@mantine/core";
import React from "react";
import Main from "../../components/layouts/Main";

import Settings from "components/Settings/Settings"
import Emailacces from "components/Settings/Emailacces"
import Loginacces from "components/Settings/Loginacces"

export default function indstillinger() {
  return (
    <Main className="">
      <Tabs variant="outline" defaultValue="indstillinger">
        <Tabs.List>
          <Tabs.Tab value="indstillinger">Indstillinger</Tabs.Tab>
          <Tabs.Tab value="emailmodtagere">E-mail modtagere</Tabs.Tab>
          <Tabs.Tab value="loginadgange">Adgange</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="indstillinger"><Settings/></Tabs.Panel>

        <Tabs.Panel value="emailmodtagere"><Emailacces/> </Tabs.Panel>

        <Tabs.Panel value="loginadgange"><Loginacces/></Tabs.Panel>
      </Tabs>
    </Main>
  );
}
