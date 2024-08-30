import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";


const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const {loading, error, isAuthenticated, isUpdated, message} = useSelector((state) => state.user);

  const dispatch = useDispatch();


// Function For Update Password
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message]);

 

  return (
    <>
           <div className="ml-12 w-full h-full">
        <div className="">
          <div className="grid w-[100%] gap-6 ">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Upadate Password</h1>
              <p className="mb-5">Update Your Dashboard Password</p>
            </div>
          </div>
          <div className="grid gap-6 ">
         
            <div className=" grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                placeholder="Current Password..."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className=" grid gap-2">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="New Password..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className=" grid gap-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Confirm New Password..."
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className=" grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={handleUpdatePassword}>Update Password</Button>
              ) : (
                <SpecialLoadingButton content={"Updatting Password"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword
