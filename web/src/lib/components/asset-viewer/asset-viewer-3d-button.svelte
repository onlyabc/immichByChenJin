<script lang="ts">
  import { AssetAction } from '$lib/constants';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { getAssetOriginalPath } from '@immich/sdk';

  export let asset: any;
  export let isEnabled = true;
  export let holoviewerBaseUrl = 'http://localhost:8080'; // 可配置的URL

  const dispatch = createEventDispatcher();
  let is3DViewerAvailable = false;

  onMount(async () => {
    try {
      // 检查holoviewer服务是否可用
      const checkResponse = await fetch(`${holoviewerBaseUrl}/holoviewer`);
      const text = await checkResponse.text();
      is3DViewerAvailable = text.trim() === '/:ok';
      console.log('3D viewer availability:', is3DViewerAvailable);
    } catch (error) {
      console.error('Failed to check 3D viewer availability:', error);
      is3DViewerAvailable = false;
    }
  });

  async function handle3DView() {
    try {
      if (!is3DViewerAvailable) {
        alert('3D查看器运行异常，请确保服务已启动');
        return;
      }

      if (!asset || !asset.id || !asset.originalFileName) {
        console.error('Invalid asset data:', asset);
        alert('资源数据无效');
        return;
      }

      const downloadUrl = getAssetOriginalPath(asset.id);
      console.log('Asset data:', {
        id: asset.id,
        originalFileName: asset.originalFileName,
        downloadUrl,
      });

      // 服务可用，发送预览请求
      const params = new URLSearchParams({
        originalName: asset.originalFileName,
        downloadUrl: downloadUrl,
      });

      const url = `${holoviewerBaseUrl}/holoviewer/preview?${params.toString()}`;
      console.log('Sending 3D preview request to:', url);

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to open 3D viewer: ${response.status} ${response.statusText}`);
      }

      // 成功打开3D查看器
      console.log('Successfully opened 3D viewer');
    } catch (error) {
      console.error('Failed to open 3D viewer:', error);
      alert('3D查看器运行异常，请确保服务已启动');
    }
  }
</script>

<button class="btn btn-icon" title="View in 3D" on:click={handle3DView} disabled={!isEnabled || !is3DViewerAvailable}>
  <i class="fas fa-cube" />
</button>

<style>
  .btn {
    padding: 0.5rem;
    border-radius: 0.25rem;
    background: transparent;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn:hover:not(:disabled) {
    background: #f0f0f0;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
