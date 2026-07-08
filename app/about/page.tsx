"use client"

import { SELECTION_GRID_CONSTS } from "@/lib/constants";
import { X, CheckCircle, MapPin, GraduationCap, User, Braces, Lightbulb, Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import { useState } from "react";

// SelectionCard: Helper component for the selection grid to display about me cards
type SelectionCardProps = {
  label: string;
  image: string;
  onClick?: () => void;
};

const SelectionCard = ({ label, image, onClick }: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="
        relative w-full aspect-1/2 md:aspect-3/4 rounded-xl overflow-hidden
        select-none cursor-pointer
        transition-transform duration-300
        hover:scale-[1.03]
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Glass layer */}
      <div className="absolute inset-0 backdrop-blur-sm border border-gray-400/50" />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="
          px-12 py-16 rounded-xl
          bg-radial
          from-zinc-900/90
          to-transparent to-60%
        ">
          <h2 className="text-white text-xl md:text-3xl font-bold text-center">
            {label}
          </h2>
        </div>
      </div>
    </button>
  );
};

// SelectionCardModal: Modal that pops up on selection card click
type SelectionCardModalProps = {
  selectionModalOpen: boolean;
  currentSelection: number;
  setSelectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSelection: React.Dispatch<React.SetStateAction<number>>;
};

const SelectionCardModal = ({
  selectionModalOpen,
  currentSelection,
  setSelectionModalOpen,
  setCurrentSelection,
}: SelectionCardModalProps) => {

  const modalContent = 
    currentSelection != -1 
      ? SELECTION_GRID_CONSTS[currentSelection]
      : null; 

  const mockHandle = <b className="font-semibold text-rose-700 dark:text-rose-500">@miguel.justin</b>

  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-xs
        transition-opacity duration-300
        ${
          selectionModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
      onClick={() => {
        setSelectionModalOpen(false);
        setCurrentSelection(-1);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative overflow-hidden

          w-[90%]
          max-w-2xl

          rounded-xl
          border border-slate-300
          dark:border-slate-800

          backdrop-blur-md
          bg-slate-50
          dark:bg-slate-950/70

          p-6

          transition-all duration-300

          ${
            selectionModalOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }
        `}
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{modalContent && modalContent.label}</h2>

          <button
            onClick={() => {
              setSelectionModalOpen(false);
              setCurrentSelection(-1);
            }}
            className="cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="
              relative w-full
              select-none cursor-pointer
              transition-transform duration-300
              aspect-5/2
            "
          >
            {/* Placeholder Image */}
            {modalContent &&
              <img
                src={modalContent ? modalContent.image : "https://placehold.co/1000x400/1f2937/e5e7eb?text=Loading"}
                alt={modalContent ? modalContent.label : "Empty image"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            }
          </div>

          {/* Social Media Hotbar Design */}
          <div className="mt-2 w-full flex flex-row justify-between
            h-fit text-lg items-center align-center">
              <div className="flex items-center align-center justify-center">
                <Heart />
              </div>
              <div className="flex items-center align-center justify-center">
                <MessageCircle />
              </div>
              <div className="flex items-center align-center justify-center">
                <Repeat2 />
              </div>
              <div className="flex items-center align-center justify-center">
                <Share2 />
              </div>
          </div>

          {/* Body */}
          <p className="my-2 text-justify">{mockHandle} {modalContent && modalContent.description}</p>

          {/* Footer */}
          <div className="w-full border-t 
          border-slate-300 dark:border-slate-800 
          pt-2 text-sm text-gray-500 
          flex flex-row justify-between gap-4">
            <span className="w-fit italic">Posted on July 7, 2026 at 4:10 PM PST</span>
            {modalContent && <span className="text-right">Credit: {modalContent && modalContent.credit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// AboutPage: Main page component to display the full content regarding 'About Me' feature
export default function AboutPage() {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<number>(-1);
  
  return (
    <main className="w-full h-fit min-h-[90vh] flex flex-col items-center">

      {/* Mobile layout: sm and below */}
      <section className="
        flex-1
        sm:flex
        md:hidden flex-col
        w-full
        pb-16 px-4">

        {/* Info Card/Row */}
        <div className="
            flex flex-row
            items-center
            w-full h-fit
        ">
            
            {/* Avatar */}
            <div className="
                flex items-center justify-center
                w-28 shrink-0
            ">
                <div className="
                    h-24
                    aspect-square 
                    rounded-full
                    overflow-hidden
                    border-4
                    border-rose-800
                ">
                    <img
                      src="/images/hero_picture.jpg"
                      alt="Miguel Justin Bunda"
                      className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Information */}
            <div className="
                flex-1 
                flex flex-col pl-4
            ">
                
                {/* Name Row */}
                <div className="
                    w-full h-1/3
                    flex
                    items-center
                    gap-2
                    text-lg uppercase font-semibold
                    mt-2
                ">
                    <span>Miguel Justin Bunda</span>
                    <CheckCircle size={14} className="text-rose-800 dark:text-rose-500" />
                </div>

                {/* Subinfo Row */}
                <div className="
                    w-full flex-1 mt-2
                    grid grid-cols-2 grid-rows-2 gap-2
                ">
                    {/* Subinfo 1 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Mandaluyong</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={14} />
                          Location
                        </span>
                    </div>
                    {/* Subinfo 2 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">BSIT</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <GraduationCap size={14} />
                          Course
                        </span>
                    </div>
                    {/* Subinfo 3 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Male</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <User size={14} />
                          Gender
                        </span>
                    </div>
                    {/* Subinfo 4 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Python</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Braces size={14} />
                          First Language
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Major Card Row */}
        <div className="
            flex flex-row
            w-full h-24 
            my-4
        "> 
            <div className="
                relative
                overflow-hidden
                w-full h-full 
                flex flex-col 
                items-start justify-center
                rounded-lg 
                border border-slate-300 dark:border-slate-800
                backdrop-blur-md
                py-6 px-4
                
            ">
                {/* Glass base layer */}
                <div className="absolute inset-0 -z-10 bg-radial from-slate-500/40 via-slate-400/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

                <span className="
                    w-full h-fit
                    flex items-center gap-1
                    uppercase 
                    text-gray-500
                    font-semibold
                    text-sm
                    mb-1
                ">
                  <Lightbulb size={16} />
                  Helpful Tip
                </span>
                <span className="w-full h-fit text-sm">The cards below are interactable! Click on them and a modal will pop up.</span>
            </div>
        </div>

        {/* Selection Grid */}
        <div className="w-full h-full grid grid-cols-3 gap-1">
        {SELECTION_GRID_CONSTS.map((card) => (
            <SelectionCard
              key={card.id}
              label={card.label}
              image={card.image}
              onClick={() => {
                setCurrentSelection(card.id);
                setSelectionModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Tablet layout: md only */}
      <section className="
        flex-1
        hidden
        md:flex 
        lg:hidden flex-col
        w-2xl
        pb-16">

        {/* Info Card/Row */}
        <div className="
            flex flex-row
            w-full h-36
        ">
            
            {/* Avatar */}
            <div className="
                relative
                h-full
                aspect-square 
                rounded-full
                overflow-hidden
                border-4
                border-rose-800
            ">
                <img
                  src="/images/hero_picture.jpg"
                  alt="Miguel Justin Bunda"
                  className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Information */}
            <div className="
                flex-1 
                flex flex-col pl-8
            ">
                
                {/* Name Row */}
                <div className="
                    w-full h-1/3
                    flex
                    items-center
                    gap-2
                    text-lg uppercase font-semibold
                    mt-2
                ">
                    <span>Miguel Justin Bunda</span>
                    <CheckCircle size={14} className="text-rose-800 dark:text-rose-500" />
                </div>

                {/* Subinfo Row */}
                <div className="
                    w-full flex-1
                    grid grid-cols-4 gap-2
                ">
                    {/* Subinfo 1 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Mandaluyong</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={14} />
                          Location
                        </span>
                    </div>
                    {/* Subinfo 2 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">BSIT</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <GraduationCap size={14} />
                          Course
                        </span>
                    </div>
                    {/* Subinfo 3 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Male</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <User size={14} />
                          Gender
                        </span>
                    </div>
                    {/* Subinfo 4 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-base font-bold">Python</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Braces size={14} />
                          First Language
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Major Card Row */}
        <div className="
            flex flex-row
            w-full h-24 
            my-4
        "> 
            <div className="
                relative
                overflow-hidden
                w-full h-full 
                flex flex-col 
                items-start justify-center
                rounded-lg 
                border border-slate-300 dark:border-slate-800
                backdrop-blur-md
                py-6 px-4
                
            ">
                {/* Glass base layer */}
                <div className="absolute inset-0 -z-10 bg-radial from-slate-500/40 via-slate-400/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

                <span className="
                    w-full h-fit
                    flex items-center gap-1
                    uppercase 
                    text-gray-500
                    font-semibold
                    text-sm
                    mb-1
                ">
                  <Lightbulb size={16} />
                  Helpful Tip
                </span>
                <span className="w-full h-fit text-sm">The cards below are interactable! Click on them and a modal will pop up.</span>
            </div>
        </div>

        {/* Selection Grid */}
        <div className="w-full h-full grid grid-cols-3 gap-2">
        {SELECTION_GRID_CONSTS.map((card) => (
            <SelectionCard
              key={card.id}
              label={card.label}
              image={card.image}
              onClick={() => {
                setCurrentSelection(card.id);
                setSelectionModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Desktop layout: lg and up */}
      <section className="
        flex-1
        hidden 
        lg:flex flex-col
        w-4xl
        pb-16">

        {/* Info Card/Row */}
        <div className="
            flex flex-row
            w-full h-36
        ">
            
            {/* Avatar */}
            <div className="
                relative
                h-full
                aspect-square 
                rounded-full
                overflow-hidden
                border-4
                border-rose-800
            ">
                <img
                  src="/images/hero_picture.jpg"
                  alt="Miguel Justin Bunda"
                  className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Information */}
            <div className="
                flex-1 
                flex flex-col pl-8
            ">
                
                {/* Name Row */}
                <div className="
                    w-full h-1/3
                    flex
                    items-center
                    gap-2
                    text-lg uppercase font-semibold
                    mt-2
                ">
                    <span>Miguel Justin Bunda</span>
                    <CheckCircle size={14} className="text-rose-800 dark:text-rose-500" />
                </div>

                {/* Subinfo Row */}
                <div className="
                    w-full flex-1
                    grid grid-cols-4 gap-2
                ">
                    {/* Subinfo 1 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Mandaluyong</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={14} />
                          Location
                        </span>
                    </div>
                    {/* Subinfo 2 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">BSIT</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <GraduationCap size={14} />
                          Course
                        </span>
                    </div>
                    {/* Subinfo 3 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Male</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <User size={14} />
                          Gender
                        </span>
                    </div>
                    {/* Subinfo 4 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Python</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Braces size={14} />
                          First Language
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Major Card Row */}
        <div className="
            flex flex-row
            w-full h-24 
            my-4
        "> 
            <div className="
                relative
                overflow-hidden
                w-full h-full 
                flex flex-col 
                items-start justify-center
                rounded-lg 
                border border-slate-300 dark:border-slate-800
                backdrop-blur-md
                py-6 px-4
                
            ">
                {/* Glass base layer */}
                <div className="absolute inset-0 -z-10 bg-radial from-slate-500/40 via-slate-400/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

                <span className="
                    w-full h-fit
                    flex items-center gap-1
                    uppercase 
                    text-gray-500
                    font-semibold
                    text-sm
                    mb-1
                ">
                  <Lightbulb size={16} />
                  Helpful Tip
                </span>
                <span className="w-full h-fit text-sm">The cards below are interactable! Click on them and a modal will pop up.</span>
            </div>
        </div>

        {/* Selection Grid */}
        <div className="w-full h-full grid grid-cols-3 gap-4">
        {SELECTION_GRID_CONSTS.map((card) => (
            <SelectionCard
              key={card.id}
              label={card.label}
              image={card.image}
              onClick={() => {
                setCurrentSelection(card.id);
                setSelectionModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Selection Modal */}
     <SelectionCardModal
        selectionModalOpen={selectionModalOpen}
        currentSelection={currentSelection}
        setSelectionModalOpen={setSelectionModalOpen}
        setCurrentSelection={setCurrentSelection}
      />
    </main>
  );
}
