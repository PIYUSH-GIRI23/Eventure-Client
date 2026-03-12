"use client"

import { useSelector } from "react-redux"
import AllEventsContainer from "@/app/components/event/allEvents/AllEventsContainer"
import NotLogin from "@/app/components/NotLogin"

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.userdata)

  return (
    <div>
      {!isLoggedIn ? <NotLogin /> : <AllEventsContainer />}
    </div>
  );
}
