declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"talks/2020_07_07_Natasha_Dudek.md": {
	id: "talks/2020_07_07_Natasha_Dudek.md";
  slug: "talks/2020_07_07_natasha_dudek";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_07_21_Matthew_Scicluna.md": {
	id: "talks/2020_07_21_Matthew_Scicluna.md";
  slug: "talks/2020_07_21_matthew_scicluna";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_08_04_Zichao_Yan.md": {
	id: "talks/2020_08_04_Zichao_Yan.md";
  slug: "talks/2020_08_04_zichao_yan";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_08_18_Elliot_Layne.md": {
	id: "talks/2020_08_18_Elliot_Layne.md";
  slug: "talks/2020_08_18_elliot_layne";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_09_17_John_San_Soucie.md": {
	id: "talks/2020_09_17_John_San_Soucie.md";
  slug: "talks/2020_09_17_john_san_soucie";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_10_01_Nils_Strodthoff.md": {
	id: "talks/2020_10_01_Nils_Strodthoff.md";
  slug: "talks/2020_10_01_nils_strodthoff";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_10_15_Degui_Zhi.md": {
	id: "talks/2020_10_15_Degui_Zhi.md";
  slug: "talks/2020_10_15_degui_zhi";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_10_29_Alexander_Rives.md": {
	id: "talks/2020_10_29_Alexander_Rives.md";
  slug: "talks/2020_10_29_alexander_rives";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_11_12_Hector_Garcia_Martin.md": {
	id: "talks/2020_11_12_Hector_Garcia_Martin.md";
  slug: "talks/2020_11_12_hector_garcia_martin";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2020_11_26_Cen_Wan.md": {
	id: "talks/2020_11_26_Cen_Wan.md";
  slug: "talks/2020_11_26_cen_wan";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_04_07_Natasha_Dudek.md": {
	id: "talks/2021_04_07_Natasha_Dudek.md";
  slug: "talks/2021_04_07_natasha_dudek";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_04_07_TBA.md": {
	id: "talks/2021_04_07_TBA.md";
  slug: "talks/2021_04_07_tba";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_04_21_Guy_Wolf.md": {
	id: "talks/2021_04_21_Guy_Wolf.md";
  slug: "talks/2021_04_21_guy_wolf";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_06_02_Joseph_Viviano.md": {
	id: "talks/2021_06_02_Joseph_Viviano.md";
  slug: "talks/2021_06_02_joseph_viviano";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_06_16_Adit_Radhakrishnan,_Louis_Cammarata.md": {
	id: "talks/2021_06_16_Adit_Radhakrishnan,_Louis_Cammarata.md";
  slug: "talks/2021_06_16_adit_radhakrishnan_louis_cammarata";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_09_16_Zhaocheng_Zhu,_Chence_Shi_and_Zuobai_Zhang.md": {
	id: "talks/2021_09_16_Zhaocheng_Zhu,_Chence_Shi_and_Zuobai_Zhang.md";
  slug: "talks/2021_09_16_zhaocheng_zhu_chence_shi_and_zuobai_zhang";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_09_29_Dongjoon_Lim.md": {
	id: "talks/2021_09_29_Dongjoon_Lim.md";
  slug: "talks/2021_09_29_dongjoon_lim";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_10_27_Paul_Bertin.md": {
	id: "talks/2021_10_27_Paul_Bertin.md";
  slug: "talks/2021_10_27_paul_bertin";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2021_11_11_Alex_Tong.md": {
	id: "talks/2021_11_11_Alex_Tong.md";
  slug: "talks/2021_11_11_alex_tong";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_01_12_Michael_Levin.md": {
	id: "talks/2022_01_12_Michael_Levin.md";
  slug: "talks/2022_01_12_michael_levin";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_01_26_Dmitry_Kobak.md": {
	id: "talks/2022_01_26_Dmitry_Kobak.md";
  slug: "talks/2022_01_26_dmitry_kobak";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_02_23_Oren_Krauss.md": {
	id: "talks/2022_02_23_Oren_Krauss.md";
  slug: "talks/2022_02_23_oren_krauss";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_03_09_Tallulah_Andrews.md": {
	id: "talks/2022_03_09_Tallulah_Andrews.md";
  slug: "talks/2022_03_09_tallulah_andrews";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_04_06_Colleen_Gillon.md": {
	id: "talks/2022_04_06_Colleen_Gillon.md";
  slug: "talks/2022_04_06_colleen_gillon";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_05_18_Ionelia_Buzatu.md": {
	id: "talks/2022_05_18_Ionelia_Buzatu.md";
  slug: "talks/2022_05_18_ionelia_buzatu";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_06_01_Egbert_Castro.md": {
	id: "talks/2022_06_01_Egbert_Castro.md";
  slug: "talks/2022_06_01_egbert_castro";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_06_15_David_Hamelin.md": {
	id: "talks/2022_06_15_David_Hamelin.md";
  slug: "talks/2022_06_15_david_hamelin";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_06_29_Assya_Trofimov.md": {
	id: "talks/2022_06_29_Assya_Trofimov.md";
  slug: "talks/2022_06_29_assya_trofimov";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_11_02_Shadi_Zabad.md": {
	id: "talks/2022_11_02_Shadi_Zabad.md";
  slug: "talks/2022_11_02_shadi_zabad";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_11_16_Jason_Hartford.md": {
	id: "talks/2022_11_16_Jason_Hartford.md";
  slug: "talks/2022_11_16_jason_hartford";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2022_12_14_Srinivasan_Sivanandan.md": {
	id: "talks/2022_12_14_Srinivasan_Sivanandan.md";
  slug: "talks/2022_12_14_srinivasan_sivanandan";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2023_05_31_Zeev_Russak.md": {
	id: "talks/2023_05_31_Zeev_Russak.md";
  slug: "talks/2023_05_31_zeev_russak";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2023_06_22_Stefan_Bauer.md": {
	id: "talks/2023_06_22_Stefan_Bauer.md";
  slug: "talks/2023_06_22_stefan_bauer";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2023_11_02_Alexis_Nolin_Lapalme.md": {
	id: "talks/2023_11_02_Alexis_Nolin_Lapalme.md";
  slug: "talks/2023_11_02_alexis_nolin_lapalme";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2023_11_16_Joseph_Viviano.md": {
	id: "talks/2023_11_16_Joseph_Viviano.md";
  slug: "talks/2023_11_16_joseph_viviano";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2023_11_30_David_Hamelin.md": {
	id: "talks/2023_11_30_David_Hamelin.md";
  slug: "talks/2023_11_30_david_hamelin";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/2024_01_25_Matt_Scicluna.md": {
	id: "talks/2024_01_25_Matt_Scicluna.md";
  slug: "talks/2024_01_25_matt_scicluna";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/fwefwe copy 2.md": {
	id: "talks/fwefwe copy 2.md";
  slug: "talks/fwefwe-copy-2";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/fwefwe copy 3.md": {
	id: "talks/fwefwe copy 3.md";
  slug: "talks/fwefwe-copy-3";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"talks/fwefwe copy.md": {
	id: "talks/fwefwe copy.md";
  slug: "talks/fwefwe-copy";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
};
"talks": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "talks";
  data: InferEntrySchema<"talks">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
