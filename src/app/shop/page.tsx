'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageTransition } from '@/components/layout/PageTransition';
import { useProgressStore } from '@/store/progressStore';
import { useAvatarStore } from '@/store/avatarStore';
import Avatar from '@/components/gamification/Avatar';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ShopItemCard } from '@/components/shop/ShopItemCard';
import {
  getItemsByCategory,
  type ShopCategory,
  type ShopItem,
} from '@/lib/gamification/shop-items';

type TabConfig = { key: ShopCategory; label: string; icon: IconName };

const TABS: TabConfig[] = [
  { key: 'hair', label: 'Frisuren', icon: 'sparkle' },
  { key: 'outfit', label: 'Outfits', icon: 'user' },
  { key: 'accessory', label: 'Accessoires', icon: 'crown' },
  { key: 'pet', label: 'Begleiter', icon: 'heart' },
  { key: 'power-up', label: 'Power-Ups', icon: 'lightning' },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopCategory>('hair');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const progress = useProgressStore((s) => s.progress);
  const spendCoins = useProgressStore((s) => s.spendCoins);
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
      setPurchaseMessage(`${item.name} aktiviert!`);
    } else {
      addOwnedItem(item.id);
      const cat = item.category as 'hair' | 'outfit' | 'accessory' | 'pet';
      equipItem(cat, item.id);
      setPurchaseMessage(`${item.name} freigeschaltet!`);
    }
    setTimeout(() => setPurchaseMessage(null), 2500);
  }

  function handleEquip(item: ShopItem) {
    const cat = item.category as 'hair' | 'outfit' | 'accessory' | 'pet';
    const currentEquipped = { hair: hairStyle, outfit, accessory, pet }[cat];
    if (currentEquipped === item.id) {
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
      <PageTransition>
        <div className="max-w-lg mx-auto space-y-6">

          {/* ── Header: Avatar Preview + Coins ──────────────── */}
          <div className="relative rounded-[var(--card-radius)] overflow-hidden"
            style={{ background: 'var(--gradient-hero)' }}
          >
            <div className="relative z-10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-2xl p-2 backdrop-blur-sm">
                  <Avatar size="lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-[family-name:var(--font-heading)] font-extrabold text-white">
                    Shop
                  </h1>
                  <p className="text-white/70 text-sm mt-0.5">
                    Style deinen Avatar!
                  </p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                <div className="flex items-center gap-1.5">
                  <Icon name="coin" size={20} className="text-amber-300" />
                  <span className="text-xl font-extrabold text-white">{coins}</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
          </div>

          {/* ── Purchase Feedback ────────────────────────────── */}
          <AnimatePresence>
            {purchaseMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl px-4 py-3 text-center flex items-center justify-center gap-2"
              >
                <Icon name="check" size={16} />
                {purchaseMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Category Tabs ───────────────────────────────── */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-150',
                  activeTab === tab.key
                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200',
                ].join(' ')}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Items Grid ──────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => {
              const owned = isOwned(item.id);
              const equipped = !item.consumable && owned && isEquipped(item);
              const canBuy = coins >= item.cost;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ShopItemCard
                    item={item}
                    owned={owned}
                    equipped={equipped}
                    canBuy={canBuy}
                    onPurchase={() => handlePurchase(item)}
                    onEquip={() => handleEquip(item)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </PageWrapper>
  );
}
