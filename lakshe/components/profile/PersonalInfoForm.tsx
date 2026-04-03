import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Linkedin } from "lucide-react";

function PersonalInfoForm() {
  return (
    <div className="flex flex-col gap-4 p-5 bg-card my-10 rounded-lg text-gray-400">
      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="fname" className="text-xs font-bold">
            FIRST NAME
          </Label>
          <Input id="fname" type="text" placeholder="John" required />
        </div>
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="lname" className="text-xs font-bold">
            LAST NAME
          </Label>
          <Input id="lname" type="text" placeholder="Doe" required />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="email" className="text-xs font-bold">
            EMAIL
          </Label>
          <Input id="fname" type="text" placeholder="spa@email.com" required />
        </div>
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="phone" className="text-xs font-bold">
            PHONE
          </Label>
          <Input id="phone" type="text" placeholder="+13546589989" required />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="summary" className="text-xs font-bold">
            POFESSIONAL HEADLINE
          </Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Sr. Software Engineer at Lakshe | Certified AWS Solutions Architect"
            rows={4}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="linkenin" className="text-xs font-bold">
            LINKEDIN
          </Label>
          <Input id="linkenin" type="text" placeholder="John" required />
        </div>
        <div className="grid gap-2 w-1/2">
          <Label htmlFor="github" className="text-xs font-bold">
            GITHUB
          </Label>
          <Input id="github" type="text" placeholder="Doe" required />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
