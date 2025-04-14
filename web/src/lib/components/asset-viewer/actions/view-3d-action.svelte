<script lang="ts">
  import { AssetAction } from '$lib/constants';
  import { mdiCube } from '@mdi/js';
  import { t } from 'svelte-i18n';
  import CircleIconButton from '$lib/components/elements/buttons/circle-icon-button.svelte';
  import type { OnAction } from '../action';
  import type { AssetResponseDto } from '@immich/sdk';
  import AssetViewer3DButton from '../asset-viewer-3d-button.svelte';

  interface Props {
    asset: AssetResponseDto;
    onAction: OnAction;
    menuItem?: boolean;
  }

  let { asset, onAction, menuItem = false }: Props = $props();

  const handleClick = () => {
    onAction({ type: AssetAction.VIEW_3D, asset });
  };
</script>

{#if menuItem}
  <div class="menu-item" on:click={handleClick}>
    <i class="fas fa-cube"></i>
    <span>{$t('view_in_3d')}</span>
  </div>
{:else}
  <AssetViewer3DButton {asset} />
{/if}

<style>
  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>
