'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useProgressStore } from '@/store/progressStore';
import { useAvatarStore } from '@/store/avatarStore';
import Avatar from '@/components/gamification/Avatar';
import {
  SHOP_ITEMS,
  getItemsByCategory,
  type ShopCategory,
  type ShopItem,
} from '@/lib/gamification/shop-items';
import { createPowerUpMultiplier } from '@/lib/gamification/xp-multiplier';

type TabConfig = { key: ShopCategory; label: string; icon: string };

const TABS: TabConfig[] = [
  { key: 'power-up', label: 'Power-Ups', icon: '⚡' },
  { key: 'outfit', label: 'Outfits', icon: '👕' },
  { key: 'hair', label: 'Frisuren', icon: '💇' },
  { key: 'accessory', label: 'Accessoires', icon: '🎩' },
  { key: 'pet', label: 'Begleiter', icon: '🐾' },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopCategory>('power-up');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const progress = useProgressStore((s) => s.progress);
  const spendCoins = useProgressStore((s) => s.spendCoins);
  const earnCoins = useProgressStore((s) => s.earnCoins);
  const { addOwnedItem, isOwned, equipItem, hairStyle, outfit, accessory, pet } = useAvatarStore();

  const coins = progress?.coins ?? 0;
  const items = getItemsByCategory(activeTab);

  function handlePurchase(item: ShopItem) {
    if (coins < item.cost) {
      setPurchaseMessage('Nicht genug Münzen!');
      setTimeout(() => setPurchaseMessage(null), 2000);
      return;
    }

    const success = spendCoins(item.cost);
    if (!success) return;

    if (item.consumable) {
      // Power-up: apply effect
      setPurchaseMessage(`${item.name} aktiviert!`);
    } else {
      // Avatar item: add to owned + equip
      addOwnedItem(item.id);
      const cat = item.category as 'hair' | 'outfit' | 'accessory' | 'pet';
      equipItem(cat, item.id);
      setPurchaseMessage(`${item.name} freigeschaltet und ausgerüstet!`);
    }
    setTimeout(() => setPurchaseMessage(null), 2500);
  }

  function handleEquip(item: ShopItem) {
    const cat = item.category as 'hair' | 'outfit' | 'accessory' | 'pet';
    const currentEquipped = { hair: hairStyle, outfit, accessory, pet }[cat];
    if (currentEquipped === item.id) {
      // Unequip
      useAvatarStore.getState().unequipItem(cat);
    } else {
      equipItem(cat, item.id);
    }
  }

  function isEquipped(item: ShopItem): boolean {
    const equipped = { hair: hairStyle, outfit, accessory, pet };
    return equipped[item.category as keyof typeof equipped] === item.id;
  }

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header with avatar and coins */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Shop</h1>
            <p className="text-sm text-gray-500">Gib deine Münzen aus!</p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar size="md" />
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-amber-600">{coins}</div>
              <div className="text-xs text-amber-500">Münzen</div>
            </div>
          </div>
        </div>

        {/* Purchase feedback */}
        {purchaseMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium rounded-xl px-4 py-2 text-center">
            {purchaseMessage}
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => {
            const owned = isOwned(item.id);
            const equipped = !item.consumable && owned && isEquipped(item);
            const canBuy = coins >= item.cost;

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-3 space-y-2 transition ${
                  equipped
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : owned
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>

                {owned && !item.consumable ? (
                  <button
                    onClick={() => handleEquip(item)}
                    className={`w-full py-1.5 text-xs font-semibold rounded-lg transition ${
                      equipped
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-[var(--color-primary)] text-white'
                    }`}
                  >
                    {equipped ? 'Ablegen' : 'Anziehen'}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!canBuy}
                    className={`w-full py-1.5 text-xs font-semibold rounded-lg transition ${
                      canBuy
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.cost} Münzen
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
