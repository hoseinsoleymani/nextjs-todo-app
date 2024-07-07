import { SystemState, fetchSystem, wrapper } from "@/store";
import { useSelector } from "react-redux";


const Page = () => {
  const counter = useSelector((state: SystemState) => state)
  console.log(counter)

  return <div>d</div>
};

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchSystem());
  
  return {
    props: {
          serverTimestamp: new Date().getTime(),
    }
  };
});

export default Page;