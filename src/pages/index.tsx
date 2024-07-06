import { useAppDispatch } from "@/slices";
import { increment } from "@/slices/todo";
import { wrapper } from "@/store";
import { NextPage } from "next";
import { connect, useSelector } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}) => {
  store.dispatch({type: "TICK", payload: 'was set in other page'});
  
  return null;
});

const Page = () => {
  const dispatch = useAppDispatch()
  const counter = useSelector((state: {counter: string}) => state.counter)

  return <div>d</div>
};


export default Page;