"use client";

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/lib/toast';
import { formatGhs } from '@/lib/orders';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Product } from '@/types';

type Props = {
  items?: Product[];
  addProduct: (p: Product) => Promise<unknown> | void;
  updateProduct: (p: Partial<Product> & { id: string }) => Promise<unknown> | void;
  deleteProduct: (id: string) => Promise<unknown> | void;
};

export default function AdminProductsClient({ items: initialItems, addProduct, updateProduct, deleteProduct }: Props) {
  const [items] = useState<Product[]>(initialItems || []);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const openNew = () => {
    setEditing(null);
    setShowModal(true);
  };

  const onSave = async (data: ProductInput) => {
    if (!data.name || !data.price) {
      toast.error('Name and price required');
      return;
    }
    try {
      if (editing) {
        await updateProduct({ id: editing.id, ...data });
        toast.success('Product updated');
      } else {
  const p: Product = { id: uuidv4(), ...data };
        await addProduct(p);
        toast.success('Product added');
      }
      // optimistic refresh by reloading list from server via location reload
        setShowModal(false);
        // ideally use router.refresh(), but reload is a safe fallback
        window.location.reload();
    } catch {
      toast.error('Failed to save product');
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      window.location.reload();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold">Products</h2>
  <button onClick={openNew} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-4 py-2 rounded">Add Product</button>
      </div>

  <div className="bg-semantic-surface-card rounded-2xl shadow overflow-hidden">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 relative">
                <Image src={p.image} alt={p.name} fill className="object-cover rounded" />
              </div>
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-semantic-text-muted">{p.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-medium">{formatGhs(p.price)}</div>
              <button onClick={() => { setEditing(p); setShowModal(true); }} className="px-3 py-1 bg-soft-accent rounded">Edit</button>
            <button onClick={() => onDelete(p.id)} className="px-3 py-1 bg-red-100 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} onSave={onSave} initial={editing} />
      )}
    </div>
  );
}

type ProductInput = Omit<Product, 'id'>;

function Modal({ onClose, onSave, initial }: { onClose: () => void; onSave: (d: ProductInput) => void; initial: Product | null }) {
  const [name, setName] = useState(initial?.name || '');
  const [desc, setDesc] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price?.toString() || '');
  const [image, setImage] = useState(initial?.image || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-semantic-surface-card rounded-lg p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{initial ? 'Edit Product' : 'Add Product'}</h3>
        <div className="grid gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="p-2 border rounded" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="p-2 border rounded" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="p-2 border rounded" />
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="p-2 border rounded" />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 rounded">Cancel</button>
          <button onClick={() => onSave({ name, description: desc, price: Number(price), image })} className="px-3 py-2 bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white rounded">Save</button>
        </div>
      </motion.div>
    </div>
  );
}
