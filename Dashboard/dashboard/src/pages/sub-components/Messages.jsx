import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from "@/store/slices/messagesSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const navigateTo = useNavigate();

  // Function For Redirect on HomePage, of user...
  // const handleReturnToDashboard = () => {
  //   navigateTo("/");
  // };

  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const dispatch = useDispatch();
  const [messageId, setMessageId] = useState("");

  // Function Code For Delete Message...
  const handleMassageDelete = (id) => {
      setMessageId(id);
      dispatch(deleteMessage(id));
  }

  useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearAllMessageErrors());
  }
  if (message) {
    toast.success(message);
    dispatch(resetMessageSlice());
    dispatch(getAllMessages());
  }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className=" min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 ">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
               
              </CardHeader>

              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                      <Card key={element._id} className="grid gap-2 px-3 py-6">
                        {/* For Sender Name... */}
                        <CardDescription className="text-slate-950 ">
                          <span className="font-bold mr-2">Sender Name:</span>
                          {element.senderName}
                        </CardDescription>

                        {/*  For Subject... */}
                        <CardDescription className="text-slate-950 ">
                          <span className="font-bold mr-2">Subject:</span>
                          {element.subject}
                        </CardDescription>

                        {/* For Message...  */}
                        <CardDescription className="text-slate-950 ">
                          <span className="font-bold mr-2">Message:</span>
                          {element.message}
                        </CardDescription>

                        <CardFooter className="justify-end">
                          {loading && messageId === element._id ? (
                            <SpecialLoadingButton width={"w-32"} content={"Deleting"} />
                          ) : (
                            <Button className="w-32" onClick={() => handleMassageDelete(element._id)} >Delete</Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader>No Messages Found</CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
