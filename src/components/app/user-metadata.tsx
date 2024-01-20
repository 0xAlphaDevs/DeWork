import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormData {
  userName: string;
  userType: string;
  userLocation: string;
}

export function UserMetadata() {
  const [isLoading, setIsLoading] = useState(false);
  const [sendMetaData, setSendMetaData] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userType: "",
    userLocation: "",
  });

  function handleClick() {
    // reset all state values
    setFormData({
      userName: "",
      userType: "",
      userLocation: "",
    });
    setSendMetaData(false);
    setIsLoading(false);
  }

  const constructMetaData = (
    userName: string,
    userType: string,
    userLocation: string
  ) => {
    const newMetaData = {
      userName: userName,
      userType: userType,
      userLocation: userLocation,
    };
    return newMetaData;
  };

  async function sendMetaDataForm() {
    try {
      setIsLoading(true);
      const newMetaData = constructMetaData(
        formData.userName,
        formData.userType,
        formData.userLocation
      );
      console.log(" Data: ", newMetaData);
      setIsLoading(false);
      setSendMetaData(true);
    } catch (error) {
      console.error("Error submitting metaData:", error);
      setIsLoading(false);
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering...");
    console.log("Form Data: ", formData);
    await sendMetaDataForm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            {/* <Loader /> */}
            <p>Creating record...</p>
          </div>
        ) : (
          <>
            {!sendMetaData ? (
              <>
                <DialogHeader>
                  <DialogTitle>Enter Details</DialogTitle>
                  <DialogDescription>
                    Register your details here to access the DeWork.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitRequest}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="userName"
                        value={formData.userName}
                        className="col-span-3"
                        onChange={handleChange}
                        name="userName"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userType" className="text-right">
                        Username
                      </Label>
                      <Select
                        placeholder="Select a category"
                        onValueChange={(value: string) =>
                          setFormData({
                            ...formData,
                            userType: value,
                          })
                        }
                        className="border "
                        required
                        name="userType"
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="health">Client</SelectItem>
                            <SelectItem value="travel">Freelancer</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userLocation" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="userLocation"
                        value={formData.userLocation}
                        className="col-span-3"
                        onChange={handleChange}
                        name="userLocation"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <CheckCircledIcon className="w-20 h-20 text-green-500" />
                <p>Registartion Successfully</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
