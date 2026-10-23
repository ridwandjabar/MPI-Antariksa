/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Game 5: Susun 8 Planet Berdasarkan Urutan dari Matahari (Drag & Drop / Tap to Place)
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, CheckCircle2, XCircle, Lightbulb, Trophy, Sparkles, HelpCircle } from 'lucide-react';
import { GAME_5_PLANETS, PlanetSortCard } from '../../data/gamesData.ts';
import { verifyPlanetOrder } from '../../utils/rules.ts';
import { soundManager } from '../../utils/audioSystem.ts';

interface GamePlanetSortProps {
  onComplete: (score: number) => void;
}

export const GamePlanetSort: React.FC<GamePlanetSortProps> = ({ onComplete }) => {
  // Available cards in deck (unplaced)
  const [deck, setDeck] = useState<PlanetSortCard[]>(() =>
    [...GAME_5_PLANETS].sort(() => Math.random() - 0.5)
  );

  // Slots 0..7 (representing Positions 1..8)
  const [slots, setSlots] = useState<(PlanetSortCard | null)[]>(new Array(8).fill(null));
  const [selectedCard, setSelectedCard] = useState<PlanetSortCard | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Drag state
  const [draggedCard, setDraggedCard] = useState<PlanetSortCard | null>(null);

  const handleCardClick = (card: PlanetSortCard) => {
    if (isChecked) return;
    soundManager.playClick();
    if (selectedCard?.id === card.id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  const handleSlotClick = (slotIdx: number) => {
    if (isChecked) return;

    if (selectedCard) {
      // Place selected card into this slot
      soundManager.playClick();
      placeCardInSlot(selectedCard, slotIdx);
      setSelectedCard(null);
    } else if (slots[slotIdx]) {
      // Return card from slot back to deck
      soundManager.playClick();
      removeCardFromSlot(slotIdx);
    }
  };

  const placeCardInSlot = (card: PlanetSortCard, targetSlotIdx: number) => {
    // If card was in another slot, clear that slot
    const prevSlotIdx = slots.findIndex((c) => c?.id === card.id);
    const newSlots = [...slots];

    if (prevSlotIdx !== -1) {
      newSlots[prevSlotIdx] = null;
    }

    // If target slot already has a card, return it to deck
    const existingCard = newSlots[targetSlotIdx];
    let newDeck = deck.filter((c) => c.id !== card.id);
    if (existingCard && existingCard.id !== card.id) {
      newDeck = [...newDeck, existingCard];
    }

    newSlots[targetSlotIdx] = card;
    setSlots(newSlots);
    setDeck(newDeck);
  };

  const removeCardFromSlot = (slotIdx: number) => {
    const card = slots[slotIdx];
    if (!card) return;
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    setDeck((prev) => [...prev, card]);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, card: PlanetSortCard) => {
    setDraggedCard(card);
    e.dataTransfer.setData('text/plain', card.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    if (draggedCard) {
      soundManager.playClick();
      placeCardInSlot(draggedCard, slotIdx);
      setDraggedCard(null);
    }
  };

  const handleCheck = () => {
    soundManager.playClick();
    const planetIds = slots.map((c) => (c ? c.id : ''));
    const result = verifyPlanetOrder(planetIds);

    const calculatedScore = Math.round((result.correctPositionsCount / 8) * 100);
    setScore(calculatedScore);
    setIsChecked(true);

    if (result.isAllCorrect) {
      soundManager.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      soundManager.playSuccess();
    }

    onComplete(calculatedScore);
  };

  const handleReset = () => {
    soundManager.playClick();
    setDeck([...GAME_5_PLANETS].sort(() => Math.random() - 0.5));
    setSlots(new Array(8).fill(null));
    setSelectedCard(null);
    setIsChecked(false);
    setScore(null);
  };

  const isAllFilled = slots.every((s) => s !== null);

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>🚀</span> Susun Urutan 8 Planet dari Matahari
          </h4>
          <p className="text-xs text-slate-300">
            Seret (drag) atau klik kartu planet di bawah, lalu tempatkan ke kotak slot nomor 1 hingga 8 secara berurutan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40"
          >
            <Lightbulb className="w-3.5 h-3.5" /> Petunjuk
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Atur Ulang
          </button>
        </div>
      </div>

      {/* Hint Alert */}
      {showHint && (
        <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 animate-in fade-in">
          💡 <strong>Jembatan Keledai Antariksa:</strong> &ldquo;<strong>Me</strong>rkurius - <strong>Ve</strong>nus - <strong>Bu</strong>mi - <strong>Ma</strong>rs | <strong>Ju</strong>piter - <strong>Sa</strong>turnus - <strong>U</strong>ranus - <strong>N</strong>eptunus&rdquo; (Singkatan: <em>Meva Bima JuSaUn</em>).
        </div>
      )}

      {/* Slots Line Starting with Sun */}
      <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-3 min-w-[700px]">
          {/* Starting Sun */}
          <div className="flex flex-col items-center justify-center w-16 h-24 rounded-xl bg-gradient-to-t from-amber-600 to-yellow-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)] shrink-0">
            <span className="text-2xl animate-spin" style={{ animationDuration: '20s' }}>
              ☀️
            </span>
            <span className="text-[10px] font-bold mt-1 uppercase">Matahari</span>
            <span className="text-[8px] opacity-80">(Pusat)</span>
          </div>

          <span className="text-slate-600 font-bold shrink-0">➔</span>

          {/* 8 Target Slots */}
          {slots.map((card, idx) => {
            const slotNum = idx + 1;
            const isSlotCorrect = isChecked && card && card.correctSlot === slotNum;
            const isSlotWrong = isChecked && card && card.correctSlot !== slotNum;

            return (
              <div
                key={idx}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => handleSlotClick(idx)}
                className={`w-20 h-24 rounded-xl border-2 flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer relative shrink-0 ${
                  isChecked
                    ? isSlotCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : card
                    ? 'bg-slate-800 border-indigo-400 text-white shadow'
                    : selectedCard
                    ? 'bg-slate-900/90 border-cyan-400/60 border-dashed text-slate-400 hover:border-cyan-400'
                    : 'bg-slate-900/60 border-slate-700 border-dashed text-slate-500 hover:border-slate-500'
                }`}
              >
                {/* Slot Number Badge */}
                <div className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center text-slate-300">
                  {slotNum}
                </div>

                {/* Card in Slot */}
                {card ? (
                  <div className="text-center w-full">
                    <div
                      className="w-7 h-7 mx-auto rounded-full mb-1 shadow-md border border-white/30"
                      style={{ backgroundColor: card.color }}
                    />
                    <div className="text-[11px] font-bold truncate leading-tight">
                      {card.name}
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-500 text-center">
                    {selectedCard ? 'Klik Taruh' : 'Kosong'}
                  </span>
                )}

                {/* Status icon */}
                <div className="h-4">
                  {isChecked && card && (
                    <span className="text-xs">
                      {isSlotCorrect ? '✅' : '❌'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Deck of Planet Cards */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Kartu Planet yang Tersedia ({deck.length}):
          </span>
          {selectedCard && (
            <span className="text-xs text-cyan-300 animate-pulse font-semibold">
              Kartu {selectedCard.name} terpilih! Klik salah satu kotak slot di atas.
            </span>
          )}
        </div>

        {deck.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {deck.map((card) => {
              const isSelected = selectedCard?.id === card.id;

              return (
                <div
                  key={card.id}
                  draggable={!isChecked}
                  onDragStart={(e) => handleDragStart(e, card)}
                  onClick={() => handleCardClick(card)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400/50 shadow-lg -translate-y-1'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200 hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    className="w-8 h-8 mx-auto rounded-full mb-1.5 shadow-md border border-white/20"
                    style={{ backgroundColor: card.color }}
                  />
                  <div className="text-xs font-bold truncate">{card.name}</div>
                  <div className="text-[9px] text-slate-400 truncate mt-0.5">{card.hint}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 bg-slate-800/50 rounded-xl text-center text-xs text-emerald-400 border border-emerald-500/30">
            ✓ Seluruh planet sudah ditempatkan ke dalam slot! Klik tombol Periksa di bawah.
          </div>
        )}
      </div>

      {/* Actions & Result */}
      {!isChecked ? (
        <button
          onClick={handleCheck}
          disabled={!isAllFilled}
          className={`w-full py-3 px-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
            isAllFilled
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Periksa Urutan Planet ({slots.filter((s) => s !== null).length}/8)</span>
        </button>
      ) : (
        <div className="p-4 bg-slate-800/90 rounded-xl border border-amber-500/40 text-center animate-in fade-in">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-2xl mb-1">
            <Trophy className="w-7 h-7" />
            <span>Skor: {score} / 100 Poin</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            {score === 100
              ? 'Sempurna! Kamu telah menguasai urutan delapan planet dari yang terdekat hingga yang terjauh dari Matahari!'
              : 'Beberapa planet masih tertukar posisinya. Klik tombol Atur Ulang untuk menyusun kembali ya!'}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow"
          >
            Susun Ulang
          </button>
        </div>
      )}
    </div>
  );
};
