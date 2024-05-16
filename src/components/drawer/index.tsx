import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Drawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <span className="menu__line origin-top-left transition duration-500"></span>
        <span className="menu__line my-[0.4rem] transition duration-700 ease-in-out"></span>
        <span className="menu__line origin-bottom-left transition duration-500"></span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export { Drawer };
